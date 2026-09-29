import type {
  Assessment,
  AssessmentItem,
  CapabilityResult,
  COBITDomain,
  COBITObjective,
  Evidence,
  GapAnalysisItem,
  Activity,
} from '../types';

export const domainLabels: Record<COBITDomain, string> = {
  EDM: 'Evaluate, Direct and Monitor',
  APO: 'Align, Plan and Organize',
  BAI: 'Build, Acquire and Implement',
  DSS: 'Deliver, Service and Support',
  MEA: 'Monitor, Evaluate and Assess',
};

export const domainDescriptions: Record<COBITDomain, string> = {
  EDM: 'Governance objectives related to evaluating strategic options, directing senior management, and monitoring performance.',
  APO: 'Management objectives for aligning IT strategy with enterprise goals, planning resources, and organizing governance.',
  BAI: 'Management objectives for building, acquiring, and implementing IT solutions and changes.',
  DSS: 'Management objectives for delivering, servicing, and supporting IT services and operations.',
  MEA: 'Management objectives for monitoring, evaluating, and assessing IT performance and conformance.',
};

export const cobitObjectives: COBITObjective[] = [
  {
    id: 'APO12',
    name: 'Managed Risk',
    shortDescription: 'Identify, assess, and respond to IT-related risk.',
    domain: 'APO',
    description:
      'Continually identify, assess, and respond to IT-related risk in line with the enterprise risk appetite and tolerance.',
    practices: [
      { id: 'APO12-1', description: 'IT-related risk is identified and assessed.' },
      { id: 'APO12-2', description: 'Risk response strategies are defined and implemented.' },
      { id: 'APO12-3', description: 'Risk monitoring and reporting is established.' },
    ],
  },
  {
    id: 'BAI05',
    name: 'Managed Organizational Change',
    shortDescription: 'Manage organizational change in a controlled manner.',
    domain: 'BAI',
    description:
      'Manage all changes to organizational structure, processes, and culture in a controlled and structured manner.',
    practices: [
      { id: 'BAI05-1', description: 'Organizational change impact is assessed.' },
      { id: 'BAI05-2', description: 'Change management plans are developed and executed.' },
      { id: 'BAI05-3', description: 'Stakeholder communication and training are provided.' },
    ],
  },
  {
    id: 'BAI06',
    name: 'Managed IT Changes',
    shortDescription: 'Manage all changes in a controlled and structured manner.',
    domain: 'BAI',
    description:
      'Manage all changes to IT infrastructure, applications, and services in a controlled and structured manner to minimize risk and disruption.',
    practices: [
      { id: 'BAI06-1', description: 'Changes are formally assessed, prioritized, authorized, implemented and reviewed.' },
      { id: 'BAI06-2', description: 'Change requests are logged, categorized, and tracked through the change lifecycle.' },
      { id: 'BAI06-3', description: 'Emergency changes follow a defined expedited process with post-implementation review.' },
      { id: 'BAI06-4', description: 'Change success is measured and reported to stakeholders.' },
    ],
  },
  {
    id: 'DSS06',
    name: 'Managed Business Process Controls',
    shortDescription: 'Manage business process controls and assurance activities.',
    domain: 'DSS',
    description:
      'Manage the controls over business processes and IT services to ensure that they operate effectively and meet business requirements.',
    practices: [
      { id: 'DSS06-1', description: 'Business process controls are defined and documented.' },
      { id: 'DSS06-2', description: 'Controls are monitored and tested on a regular basis.' },
      { id: 'DSS06-3', description: 'Control deficiencies are identified and remediated.' },
    ],
  },
  {
    id: 'MEA01',
    name: 'Managed Performance and Conformance Monitoring',
    shortDescription: 'Monitor and evaluate IT performance and conformance.',
    domain: 'MEA',
    description:
      'Monitor and evaluate the performance and conformance of IT against objectives, policies, and regulatory requirements.',
    practices: [
      { id: 'MEA01-1', description: 'Performance metrics are defined and collected.' },
      { id: 'MEA01-2', description: 'Conformance with policies and regulations is assessed.' },
      { id: 'MEA01-3', description: 'Monitoring results are reported and acted upon.' },
    ],
  },
];

export const currentAssessment: Assessment = {
  id: 'assess-001',
  title: 'IT Governance Baseline Assessment',
  organization: 'Sample Organization',
  assessor: 'Assessor Name',
  period: 'Q3 2026',
  status: 'in-progress',
  selectedObjectives: ['BAI06', 'APO12', 'DSS06'],
  progress: 60,
  currentStage: 'Assessment',
  createdAt: '2026-09-15',
  updatedAt: '2026-09-28',
};

export const assessmentItems: AssessmentItem[] = [
  {
    id: 'item-001',
    objectiveId: 'BAI06',
    statement: 'Changes are formally assessed, prioritized, authorized, implemented and reviewed.',
    response: 'largely-achieved',
    notes: 'Change advisory board meets weekly. Most changes follow the standard process, but emergency changes sometimes bypass full documentation.',
    evidenceIds: ['ev-001', 'ev-002'],
  },
  {
    id: 'item-002',
    objectiveId: 'BAI06',
    statement: 'Change requests are logged, categorized, and tracked through the change lifecycle.',
    response: 'partially-achieved',
    notes: 'Change tickets are logged in the ITSM tool, but categorization is inconsistent and lifecycle tracking is manual.',
    evidenceIds: ['ev-003'],
  },
  {
    id: 'item-003',
    objectiveId: 'BAI06',
    statement: 'Emergency changes follow a defined expedited process with post-implementation review.',
    response: 'not-achieved',
    notes: 'No formal emergency change process exists. Urgent changes are handled ad hoc by senior staff.',
    evidenceIds: [],
  },
  {
    id: 'item-004',
    objectiveId: 'BAI06',
    statement: 'Change success is measured and reported to stakeholders.',
    response: 'partially-achieved',
    notes: 'Basic change success rate is tracked, but not consistently reported to stakeholders.',
    evidenceIds: ['ev-004'],
  },
];

export const evidenceRecords: Evidence[] = [
  {
    id: 'ev-001',
    name: 'IT Change Management Policy',
    type: 'policy',
    status: 'reviewed',
    linkedItemId: 'item-001',
    assessor: 'Assessor Name',
    date: '2026-09-20',
    notes: 'Policy document v2.3, approved by IT Steering Committee.',
  },
  {
    id: 'ev-002',
    name: 'Change Request Record',
    type: 'record',
    status: 'attached',
    linkedItemId: 'item-001',
    assessor: 'Assessor Name',
    date: '2026-09-21',
    notes: 'Sample of 15 change requests from Q3 2026.',
  },
  {
    id: 'ev-003',
    name: 'Change Approval Documentation',
    type: 'documentation',
    status: 'attached',
    linkedItemId: 'item-002',
    assessor: 'Assessor Name',
    date: '2026-09-22',
    notes: 'CAB meeting minutes and approval records.',
  },
  {
    id: 'ev-004',
    name: 'Change Log',
    type: 'log',
    status: 'pending',
    linkedItemId: 'item-004',
    assessor: 'Assessor Name',
    date: '2026-09-25',
    notes: 'ITSM change log export for Q3 2026.',
  },
];

export const capabilityResults: CapabilityResult[] = [
  {
    objectiveId: 'BAI06',
    currentLevel: 2,
    targetLevel: 3,
    gap: 1,
    completionStatus: 75,
    strengths: [
      'Change advisory board is operational and meets regularly',
      'Standard change process is documented and followed for most changes',
      'Change tickets are logged in the ITSM tool',
    ],
    gaps: [
      'Emergency change process is not formally defined',
      'Change categorization is inconsistent',
      'Stakeholder reporting is not systematic',
    ],
  },
  {
    objectiveId: 'APO12',
    currentLevel: 1,
    targetLevel: 3,
    gap: 2,
    completionStatus: 40,
    strengths: ['Basic risk register exists'],
    gaps: [
      'No formal risk assessment methodology',
      'Risk response strategies are not defined',
      'Risk monitoring is ad hoc',
    ],
  },
  {
    objectiveId: 'DSS06',
    currentLevel: 2,
    targetLevel: 3,
    gap: 1,
    completionStatus: 55,
    strengths: ['Key business process controls are documented'],
    gaps: [
      'Control testing is not performed regularly',
      'No formal control deficiency tracking',
    ],
  },
];

export const gapAnalysisData: GapAnalysisItem[] = [
  { area: 'Change Authorization', current: 2, target: 3, gap: 1 },
  { area: 'Change Documentation', current: 2, target: 3, gap: 1 },
  { area: 'Change Monitoring', current: 1, target: 3, gap: 2 },
  { area: 'Emergency Change Process', current: 0, target: 3, gap: 3 },
  { area: 'Stakeholder Reporting', current: 1, target: 3, gap: 2 },
];

export const recentActivity: Activity[] = [
  {
    id: 'act-001',
    action: 'Assessment item updated',
    details: 'BAI06 - Change Authorization rated as Largely Achieved',
    timestamp: '2026-09-28 14:30',
    type: 'assessment',
  },
  {
    id: 'act-002',
    action: 'Evidence attached',
    details: 'Change Request Record linked to BAI06 item',
    timestamp: '2026-09-28 11:15',
    type: 'evidence',
  },
  {
    id: 'act-003',
    action: 'Assessment created',
    details: 'IT Governance Baseline Assessment initiated',
    timestamp: '2026-09-15 09:00',
    type: 'setup',
  },
  {
    id: 'act-004',
    action: 'Objective selected',
    details: 'BAI06 - Managed IT Changes added to assessment',
    timestamp: '2026-09-15 09:05',
    type: 'setup',
  },
];

export const responseOptions = [
  { value: 'not-achieved', label: 'Not Achieved', description: 'The practice is not implemented or is entirely ineffective.' },
  { value: 'partially-achieved', label: 'Partially Achieved', description: 'The practice is implemented but has significant gaps.' },
  { value: 'largely-achieved', label: 'Largely Achieved', description: 'The practice is implemented and effective with minor gaps.' },
  { value: 'fully-achieved', label: 'Fully Achieved', description: 'The practice is fully implemented and effective.' },
] as const;

export const capabilityLevelLabels: Record<number, string> = {
  0: 'Incomplete',
  1: 'Initial',
  2: 'Developing',
  3: 'Defined',
  4: 'Managed',
  5: 'Optimizing',
};
