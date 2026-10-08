import zipfile
import xml.etree.ElementTree as ET
import json
import os
import re

wb_takel_path = r'C:\Users\Sena\OneDrive\Kuliah\Semester 7\metopen\Kelompok Rayhan Arya Wiguna Takel.xlsx'
wb_panrb_path = r'C:\Users\Sena\OneDrive\Kuliah\Semester 7\metopen\COBIT 2019 Assessment Gap Improvement - Group PANRB - 10.06.2026.xlsx'

def read_xlsx(path):
    with zipfile.ZipFile(path, 'r') as z:
        sst = []
        if 'xl/sharedStrings.xml' in z.namelist():
            s_xml = ET.fromstring(z.read('xl/sharedStrings.xml'))
            ns = {'main': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
            for si in s_xml.findall('main:si', ns):
                sst.append(''.join([node.text for node in si.iter() if node.text]))

        wb_rels = ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))
        rel_map = {r.attrib['Id']: r.attrib['Target'] for r in wb_rels}
        wb_xml = ET.fromstring(z.read('xl/workbook.xml'))
        ns = {'main': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
        sheet_files = {s.attrib['name']: 'xl/' + rel_map[s.attrib['{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id']] for s in wb_xml.findall('main:sheets/main:sheet', ns)}

        sheets = {}
        for sname, sfile in sheet_files.items():
            s_root = ET.fromstring(z.read(sfile))
            data = {}
            for row in s_root.findall('.//main:row', ns):
                r_idx = int(row.attrib.get('r', 0))
                for c in row.findall('main:c', ns):
                    ref = c.attrib.get('r')
                    col = ''.join([ch for ch in ref if ch.isalpha()])
                    t = c.attrib.get('t')
                    v = c.find('main:v', ns)
                    val = v.text if v is not None else ''
                    if t == 's' and val.isdigit():
                        val = sst[int(val)]
                    data[(r_idx, col)] = val
            sheets[sname] = data
        return sheets

print('Reading Takel workbook...')
takel = read_xlsx(wb_takel_path)
print('Reading PANRB workbook...')
panrb = read_xlsx(wb_panrb_path)

# Extract Objectives list and descriptions from Canvas & DF1map
df1_map = takel['DF1map']
df2_map = takel['DF2map']
df3_map = takel['DF3map']
df4_map = takel['DF4map']
canvas = takel['Canvas']

gmo_cols = [
    'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP'
]

objectives = []
for i, col in enumerate(gmo_cols):
    obj_id = df2_map.get((29, col), '').strip()
    full_name = canvas.get((i + 6, 'A'), '').strip()
    name_clean = full_name
    # Remove objective code prefix if present
    match = re.match(r'^[A-Z0-9]+[\s\uFFFD\-\–\—\.]+(.*)$', full_name)
    if match:
        name_clean = match.group(1).strip()
    
    domain = obj_id[:3]
    objectives.append({
        'id': obj_id,
        'name': name_clean,
        'domain': domain,
        'description': f'COBIT 2019 {domain} Objective: {name_clean}'
    })

# DF1 Matrix 40x4
df1_matrix = []
for r in range(2, 42):
    df1_matrix.append([
        float(df1_map.get((r, 'B'), 0)),
        float(df1_map.get((r, 'C'), 0)),
        float(df1_map.get((r, 'D'), 0)),
        float(df1_map.get((r, 'E'), 0)),
    ])

# DF2 Matrix 40x13 composite
ag_cols = ['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']
eg_to_ag = [[float(df2_map.get((r, col), 0) or 0) for col in ag_cols] for r in range(9, 22)]
ag_to_gmo = [[float(df2_map.get((r, col), 0) or 0) for col in gmo_cols] for r in range(31, 44)]
df2_matrix = []
for j in range(40):
    row = []
    for i in range(13):
        row.append(sum(eg_to_ag[i][k] * ag_to_gmo[k][j] for k in range(13)))
    df2_matrix.append(row)

# DF3 Matrix 40x19
df3_cols = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T']
df3_matrix = []
for r in range(3, 43):
    df3_matrix.append([float(df3_map.get((r, col), 0)) for col in df3_cols])

# DF4 Matrix 40x20
df4_cols = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U']
df4_matrix = []
for r in range(2, 42):
    df4_matrix.append([float(df4_map.get((r, col), 0)) for col in df4_cols])

# Metadata for DF1-4
df1_categories = [
    {'id': 'growth', 'name': 'Growth / Acquisition', 'description': 'Organisasi memiliki fokus pada pertumbuhan (pendapatan)', 'baseline': 3},
    {'id': 'innovation', 'name': 'Innovation / Differentiation', 'description': 'Fokus pada penawaran produk dan layanan berbeda/inovatif', 'baseline': 3},
    {'id': 'costLeadership', 'name': 'Cost Leadership', 'description': 'Fokus pada minimalisasi biaya jangka pendek', 'baseline': 3},
    {'id': 'clientService', 'name': 'Client Service / Stability', 'description': 'Fokus pada penyediaan layanan stabil & berorientasi pelanggan', 'baseline': 3},
]

df2_categories = []
bsc_map = {
    'EG01': 'Financial', 'EG02': 'Financial', 'EG03': 'Financial', 'EG04': 'Financial', 'EG05': 'Financial',
    'EG06': 'Customer', 'EG07': 'Customer',
    'EG08': 'Internal', 'EG09': 'Internal', 'EG10': 'Internal', 'EG11': 'Internal',
    'EG12': 'Learning & Growth', 'EG13': 'Learning & Growth'
}
for r in range(9, 22):
    eg_id = df2_map.get((r, 'A'), '').strip()
    name = df2_map.get((r, 'B'), '').strip()
    df2_categories.append({
        'id': eg_id,
        'name': name,
        'category': bsc_map.get(eg_id, 'General'),
        'baseline': 3
    })

df3_categories = []
for idx, col in enumerate(df3_cols):
    name = df3_map.get((2, col), '').replace('\n', ' ').strip()
    df3_categories.append({
        'id': f'RSK{idx+1:02d}',
        'index': idx + 1,
        'name': name,
        'baselineImpact': 3,
        'baselineLikelihood': 3,
        'baselineScore': 9
    })

df4_categories = []
for idx, col in enumerate(df4_cols):
    desc = df4_map.get((1, col), '').replace('\xa0', ' ').strip()
    df4_categories.append({
        'id': f'ISS{idx+1:02d}',
        'index': idx + 1,
        'description': desc,
        'baseline': 2
    })

cobit_design_factors = {
    'objectives': objectives,
    'df1_categories': df1_categories,
    'df2_categories': df2_categories,
    'df3_categories': df3_categories,
    'df4_categories': df4_categories,
    'df1_mapping': df1_matrix,
    'df2_mapping': df2_matrix,
    'df3_mapping': df3_matrix,
    'df4_mapping': df4_matrix,
    'defaultWeights': {'df1': 2, 'df2': 1, 'df3': 3, 'df4': 4}
}

os.makedirs('src/data', exist_ok=True)
with open('src/data/cobitDesignFactors.json', 'w', encoding='utf-8') as f:
    json.dump(cobit_design_factors, f, indent=2, ensure_ascii=False)
print('Saved src/data/cobitDesignFactors.json')

# Now extract assessment activities for the 5 objectives
def find_sheet(name_sub):
    for k in panrb.keys():
        if name_sub.lower() in k.lower():
            return panrb[k]
    raise ValueError(f'Sheet {name_sub} not found')

obj_keys = {
    'EDM03': 'EDM03',
    'APO12': 'APO12',
    'DSS04': 'DSS04',
    'DSS05': 'DSS05',
    'MEA03': 'MEA03'
}

all_activities = {}
benchmark_assessments = {}
evidence_dict = {}
evidence_counter = 1

for obj_id, sheet_sub in obj_keys.items():
    sdata = find_sheet(sheet_sub)
    activities_list = []
    current_practice = ''
    current_level = 2
    max_r = max([r for r, c in sdata.keys()]) if sdata else 0
    for r in range(1, max_r + 1):
        b_val = str(sdata.get((r, 'B'), '')).strip()
        c_val = str(sdata.get((r, 'C'), '')).strip()
        d_val = str(sdata.get((r, 'D'), '')).strip()
        e_val = str(sdata.get((r, 'E'), '')).strip()
        f_val = str(sdata.get((r, 'F'), '')).strip()
        g_val = str(sdata.get((r, 'G'), '')).strip()
        h_val = str(sdata.get((r, 'H'), '')).strip()

        if b_val.startswith(obj_id):
            current_practice = b_val
        if '% Fulfillment of Level' in c_val:
            pass
        elif b_val.isdigit():
            if h_val.isdigit():
                current_level = int(h_val)
            act_num = int(b_val)
            act_id = f'{obj_id}.{act_num:02d}-{current_level}'
            
            # Map response
            ans = d_val.strip()
            if ans not in ['Yes', 'Partially', 'No', 'N.A.']:
                ans = 'N.A.'

            # Handle evidence
            ev_ids = []
            if g_val:
                ev_text = g_val.strip()
                # find existing or create
                found_id = None
                for eid, ev in evidence_dict.items():
                    if ev['notes'] == ev_text:
                        found_id = eid
                        break
                if not found_id:
                    found_id = f'EVD-{evidence_counter:03d}'
                    evidence_counter += 1
                    evidence_dict[found_id] = {
                        'id': found_id,
                        'title': f'Evidence for {obj_id} (Act {act_num})',
                        'type': 'interview' if 'Record' in ev_text or ':' in ev_text else 'documentation',
                        'referenceNumber': f'Ref-{obj_id}-L{current_level}-{act_num}',
                        'assessor': 'Assessor Tim PANRB',
                        'date': '2026-06-10',
                        'notes': ev_text,
                        'linkedActivityIds': [act_id]
                    }
                else:
                    if act_id not in evidence_dict[found_id]['linkedActivityIds']:
                        evidence_dict[found_id]['linkedActivityIds'].append(act_id)
                ev_ids.append(found_id)

            activities_list.append({
                'id': act_id,
                'practiceCode': current_practice.split()[0] if current_practice else f'{obj_id}.01',
                'activityNumber': act_num,
                'level': current_level,
                'description': c_val,
                'response': ans,
                'comment': f_val,
                'evidenceIds': ev_ids,
                'evidenceSnippet': g_val
            })

    all_activities[obj_id] = activities_list
    print(f'{obj_id}: {len(activities_list)} activities extracted')

with open('src/data/cobitActivities.json', 'w', encoding='utf-8') as f:
    json.dump(all_activities, f, indent=2, ensure_ascii=False)
print('Saved src/data/cobitActivities.json')

# Extract Potential Improvement (Recommendations)
pi_data = find_sheet('Potential Improvement')
recommendations = []
rec_counter = 1
max_r = max([r for r, c in pi_data.keys()]) if pi_data else 0
current_obj = ''

for r in range(1, max_r + 1):
    b_val = str(pi_data.get((r, 'B'), '')).strip()
    c_val = str(pi_data.get((r, 'C'), '')).strip()
    d_val = str(pi_data.get((r, 'D'), '')).strip()
    e_val = str(pi_data.get((r, 'E'), '')).strip()
    f_val = str(pi_data.get((r, 'F'), '')).strip()
    g_val = str(pi_data.get((r, 'G'), '')).strip()
    h_val = str(pi_data.get((r, 'H'), '')).strip()
    i_val = str(pi_data.get((r, 'I'), '')).strip()
    j_val = str(pi_data.get((r, 'J'), '')).strip()

    for k in obj_keys.keys():
        if k in b_val:
            current_obj = k
            break
    
    if c_val and any(c_val.startswith(k) for k in obj_keys.keys()):
        p_code = c_val.split()[0]
        obj_from_p = p_code.split('.')[0] if '.' in p_code else current_obj
        recommendations.append({
            'id': f'REC-{rec_counter:03d}',
            'objectiveId': obj_from_p,
            'practiceCode': p_code,
            'gapDescription': d_val,
            'peopleAspect': {
                'type': e_val if e_val in ['Responsibility', 'Skill & awareness', 'Communication'] else 'Responsibility',
                'action': f_val
            },
            'processAspect': {
                'type': g_val if g_val in ['Policy', 'Procedure', 'Record'] else 'Procedure',
                'action': h_val
            },
            'technologyAspect': {
                'type': i_val if i_val in ['Features', 'Infrastructure', 'Automation', 'Tools'] else 'Features',
                'action': j_val
            }
        })
        rec_counter += 1

print(f'Extracted {len(recommendations)} recommendations')

# Extract benchmark inputs from Takel DF1, DF2, DF3, DF4
df1_sheet = takel['DF1']
df2_sheet = takel['DF2']
df3_sheet = takel['DF3']
df4_sheet = takel['DF4']

benchmark_df1 = {
    'growth': 1,
    'innovation': 2,
    'costLeadership': 1,
    'clientService': 5
}

benchmark_df2 = {
    'goals': {f'EG{i:02d}': int(float(df2_sheet.get((i + 5, 'E'), 3))) for i in range(1, 14)}
}

benchmark_df3 = {'risks': {}}
for i in range(1, 20):
    r_val = float(df3_sheet.get((i + 5, 'G'), 9))
    # In Takel G is Impact x Likelihood or rating, let's check D and E in DF3 if present
    imp = int(float(df3_sheet.get((i + 5, 'D'), 3) or 3))
    lik = int(float(df3_sheet.get((i + 5, 'E'), 3) or 3))
    if imp * lik != int(r_val):
        # find factors of r_val
        r_int = int(round(r_val))
        if r_int <= 5:
            imp, lik = r_int, 1
        elif r_int % 3 == 0 and r_int // 3 <= 5:
            imp, lik = r_int // 3, 3
        elif r_int % 2 == 0 and r_int // 2 <= 5:
            imp, lik = r_int // 2, 2
        elif r_int % 4 == 0 and r_int // 4 <= 5:
            imp, lik = r_int // 4, 4
        else:
            imp, lik = 3, 3
    benchmark_df3['risks'][f'RSK{i:02d}'] = {'impact': imp, 'likelihood': lik}

benchmark_df4 = {'issues': {}}
for i in range(1, 21):
    iss_val = int(float(df4_sheet.get((i + 5, 'F'), 2)))
    benchmark_df4['issues'][f'ISS{i:02d}'] = iss_val

# Write benchmarkData.ts
ts_content = f'''import {{ FullAssessmentState, EvidenceRecord, RecommendationItem }} from '../types';
import cobitActivitiesData from './cobitActivities.json';

export const BENCHMARK_EVIDENCE: EvidenceRecord[] = {json.dumps(list(evidence_dict.values()), indent=2, ensure_ascii=False)};

export const BENCHMARK_RECOMMENDATIONS: RecommendationItem[] = {json.dumps(recommendations, indent=2, ensure_ascii=False)};

export const BENCHMARK_ASSESSMENT_STATE: FullAssessmentState = {{
  id: 'assessment-panrb-2026',
  title: 'Evaluasi Tata Kelola SPBE & Keamanan Siber Kementerian PANRB',
  organization: 'Kementerian Pendayagunaan Aparatur Negara dan Reformasi Birokrasi (PANRB)',
  assessor: 'Vio Salman Kafiyan & Tim Audit Eksternal',
  period: 'Semester I - 2026',
  weights: {{
    df1: 2,
    df2: 1,
    df3: 3,
    df4: 4
  }},
  df1: {json.dumps(benchmark_df1, indent=2)},
  df2: {json.dumps(benchmark_df2, indent=2)},
  df3: {json.dumps(benchmark_df3, indent=2)},
  df4: {json.dumps(benchmark_df4, indent=2)},
  dfResults: [],
  scopedObjectiveIds: ['EDM03', 'APO12', 'DSS04', 'DSS05', 'MEA03'],
  objectiveTargets: {{
    EDM03: 2,
    APO12: 4,
    DSS04: 4,
    DSS05: 4,
    MEA03: 4
  }},
  assessments: {{}},
  evidenceList: BENCHMARK_EVIDENCE,
  recommendations: BENCHMARK_RECOMMENDATIONS,
  updatedAt: new Date().toISOString()
}};
'''

with open('src/data/benchmarkData.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)
print('Saved src/data/benchmarkData.ts')
print('Data extraction completed successfully!')
