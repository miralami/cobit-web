/**
 * REFERENCE-CALCULATION SUITE (independent test oracle)
 * ------------------------------------------------------
 * Purpose: verify that `cpmEngine` reproduces results derived **independently**
 * from the documented rule set — the N/P/L/F percentage bands (ISO/IEC 33020:2019
 * §5.3) plus the three candidate gate rules. This is a *golden* reference test,
 * not a comparison against any ISACA workbook (none exists for capability
 * assessment; the official toolkit is design-only).
 *
 * Derivation is done by hand below for every expected value, so a reader can
 * re-check the arithmetic without running the engine. This proves implementation
 * equivalence (verification), NOT that the COBIT result is correct in a business
 * sense — see report §8.3.
 *
 * Bands (ISO/IEC 33020:2019 §5.3):
 *   N : 0 <= p <= 0.15
 *   P : 0.15 < p <= 0.50
 *   L : 0.50 < p <= 0.85
 *   F : 0.85 < p <= 1.00
 *
 * Gates:
 *   aggregate-85 : p > 0.85
 *   all-l-or-f   : every scored activity = Fully (score 1.0)
 *   iso-staged   : lower levels Fully; the claimed level Largely (p > 0.50)
 */
import { calculateObjectiveAssessment, evaluateActivitiesByLevel, getCPMRating, DEFAULT_CPM_CONFIG } from '../cpmEngine';
import type { AssessmentActivity, CapabilityLevel, CpmMethodConfig, ResponseRating } from '../../types';

console.log('=============================================');
console.log('🧪 INDEPENDENT REFERENCE-CALCULATION SUITE');
console.log('    (hand-derived oracle; NOT an external benchmark)');
console.log('=============================================');

let failures = 0;
function assertEq(name: string, actual: unknown, expected: unknown) {
  if (actual === expected) {
    console.log(`  ✅ ${name}: ${String(actual)}`);
  } else {
    failures += 1;
    console.error(`  ❌ ${name}: expected ${String(expected)}, got ${String(actual)}`);
  }
}

function mk(responses: ResponseRating[], level: CapabilityLevel): AssessmentActivity[] {
  return responses.map((r, i) => ({
    id: `T.${String(i + 1).padStart(2, '0')}-${level}`,
    activityNumber: i + 1,
    level,
    description: `activity ${i + 1}`,
    response: r,
    comment: '',
    evidenceIds: [],
  }));
}

/** n Yes followed by (20-n) No, always 20 activities => percentage = n/20 exactly. */
function yesNo(yes: number, level: CapabilityLevel): AssessmentActivity[] {
  return mk([...Array(yes).fill('Yes'), ...Array(20 - yes).fill('No')] as ResponseRating[], level);
}

const cfg = (gate: CpmMethodConfig['gate']): CpmMethodConfig => ({
  ...DEFAULT_CPM_CONFIG,
  gate,
  thresholds: { ...DEFAULT_CPM_CONFIG.thresholds },
});

// ----------------------------------------------------
// TEST 1: Band boundaries (20 activities => n/20 exact)
// ----------------------------------------------------
console.log('\n[TEST 1] N/P/L/F boundaries (n Yes out of 20)');
assertEq('0/20 = 0.00 -> N', getCPMRating(0.0), 'N');
assertEq('3/20 = 0.15 -> N', getCPMRating(3 / 20), 'N');
assertEq('4/20 = 0.20 -> P', getCPMRating(4 / 20), 'P');
assertEq('10/20 = 0.50 -> P', getCPMRating(10 / 20), 'P');
assertEq('11/20 = 0.55 -> L', getCPMRating(11 / 20), 'L');
assertEq('17/20 = 0.85 -> L', getCPMRating(17 / 20), 'L');
assertEq('18/20 = 0.90 -> F', getCPMRating(18 / 20), 'F');
assertEq('engine agrees: 17/20 band', evaluateActivitiesByLevel(yesNo(17, 2), 2).cpmRating, 'L');
assertEq('engine agrees: 18/20 band', evaluateActivitiesByLevel(yesNo(18, 2), 2).cpmRating, 'F');

// ----------------------------------------------------
// TEST 2: Gate divergence — 9 Yes + 1 No (p = 0.90)
//   aggregate-85 : 0.90 > 0.85  -> PASS
//   all-l-or-f   : one No -> not all Fully -> FAIL
//   iso-staged   : 0.90 > 0.85 Fully, no lower levels -> PASS
// ----------------------------------------------------
console.log('\n[TEST 2] Gate divergence on one Not-achieved activity (9 Yes + 1 No = 0.90)');
const nineYesOneNo = mk([...Array(9).fill('Yes'), 'No'] as ResponseRating[], 2);
const t2 = calculateObjectiveAssessment('T2', 5, nineYesOneNo, cfg('aggregate-85'));
assertEq('aggregate-85 current level', t2.currentLevelByGate!['aggregate-85'], 2);
assertEq('all-l-or-f current level', t2.currentLevelByGate!['all-l-or-f'], 1);
assertEq('iso-staged current level', t2.currentLevelByGate!['iso-staged'], 2);
assertEq('level 2 aggregate85 gate', t2.levelResults[2].gateResults!.aggregate85, true);
assertEq('level 2 allLOrF gate', t2.levelResults[2].gateResults!.allLOrF, false);

// ----------------------------------------------------
// TEST 3: ISO staged vs aggregate (L2 Fully, L3 Largely)
//   L2 = 0.90 (F), L3 = 0.60 (L)
//   aggregate-85 : climb to 2, L3 fails -> current 2
//   iso-staged   : L2 Fully supports claim; L3 Largely -> current 3
// ----------------------------------------------------
console.log('\n[TEST 3] ISO staged reaches one level higher than aggregate');
const l2 = mk([...Array(9).fill('Yes'), 'No'] as ResponseRating[], 2); // 0.90
const l3 = mk([...Array(6).fill('Yes'), ...Array(4).fill('No')] as ResponseRating[], 3); // 0.60
const t3 = calculateObjectiveAssessment('T3', 5, [...l2, ...l3], cfg('aggregate-85'));
assertEq('aggregate-85 current level', t3.currentLevelByGate!['aggregate-85'], 2);
assertEq('iso-staged current level', t3.currentLevelByGate!['iso-staged'], 3);

// ----------------------------------------------------
// TEST 4: Insufficient evidence — all activities N.A.
//   Engine must NOT read "not assessed" as "not achieved":
//   insufficientEvidence=true, status flagged, climb halts at base 1
// ----------------------------------------------------
console.log('\n[TEST 4] All-N.A. level => Insufficient Evidence (not N)');
const allNA = mk(['N.A.', 'N.A.'] as ResponseRating[], 2);
const lvl2NA = evaluateActivitiesByLevel(allNA, 2);
assertEq('insufficientEvidence flag', lvl2NA.insufficientEvidence, true);
assertEq('status', lvl2NA.status, 'Insufficient Evidence');
assertEq('validCount', lvl2NA.validCount, 0);
assertEq('naCount', lvl2NA.naCount, 2);
const t4 = calculateObjectiveAssessment('T4', 5, allNA, cfg('aggregate-85'));
assertEq('current level halts at base', t4.currentLevel, 1);

// ----------------------------------------------------
// TEST 5: N.A. excluded from denominator
//   4 Yes + 1 N.A. -> p = 4/4 = 1.00 Fully, naCount 1
// ----------------------------------------------------
console.log('\n[TEST 5] N.A. excluded from denominator');
const fourYesOneNA = mk(['Yes', 'Yes', 'Yes', 'Yes', 'N.A.'] as ResponseRating[], 2);
const lvl2B = evaluateActivitiesByLevel(fourYesOneNA, 2);
assertEq('validCount', lvl2B.validCount, 4);
assertEq('naCount', lvl2B.naCount, 1);
assertEq('percentage = 1.00', lvl2B.fulfillmentPercentage, 1);
assertEq('rating = F', lvl2B.cpmRating, 'F');

console.log('\n=============================================');
if (failures === 0) {
  console.log('🎉 ALL INDEPENDENT REFERENCE CALCULATIONS MATCH');
  console.log('=============================================\n');
} else {
  console.error(`💥 ${failures} reference assertion(s) FAILED`);
  console.log('=============================================\n');
  throw new Error(`${failures} reference assertion(s) failed`);
}
