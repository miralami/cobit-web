import { calculateDesignFactors } from '../designFactorEngine';
import { calculateObjectiveAssessment, evaluateActivitiesByLevel } from '../cpmEngine';
import { BENCHMARK_ASSESSMENT_STATE } from '../../data/benchmarkData';
import type { AssessmentActivity } from '../../types/index';

console.log('=============================================');
console.log('🧪 RUNNING GROUND TRUTH BENCHMARK TEST SUITE');
console.log('=============================================');

// ----------------------------------------------------
// TEST CASE 1: DF1 Engine Verification
// ----------------------------------------------------
console.log('\n[TEST 1] Design Factor DF1 Engine Verification');
const df1Input = { growth: 1, innovation: 2, costLeadership: 1, clientService: 5 };
// Dummy neutral DF2-4
const dummyDF2 = { goals: {} as Record<string, number> };
for (let i = 1; i <= 13; i++) dummyDF2.goals[`EG${i.toString().padStart(2, '0')}`] = 3;
const dummyDF3 = { risks: {} as Record<string, { impact: number; likelihood: number }> };
for (let i = 1; i <= 19; i++) dummyDF3.risks[`RSK${i.toString().padStart(2, '0')}`] = { impact: 3, likelihood: 3 };
const dummyDF4 = { issues: {} as Record<string, number> };
for (let i = 1; i <= 20; i++) dummyDF4.issues[`ISS${i.toString().padStart(2, '0')}`] = 2;

const dfResults = calculateDesignFactors(df1Input, dummyDF2, dummyDF3, dummyDF4);

function assertEq(name: string, actual: any, expected: any) {
  if (actual === expected) {
    console.log(`  ✅ ${name}: ${actual} (Match!)`);
  } else {
    throw new Error(`  ❌ ${name}: Expected ${expected}, got ${actual}`);
  }
}

const edm01 = dfResults.find((r) => r.objectiveId === 'EDM01')!;
const edm02 = dfResults.find((r) => r.objectiveId === 'EDM02')!;
const edm03 = dfResults.find((r) => r.objectiveId === 'EDM03')!;
const apo02 = dfResults.find((r) => r.objectiveId === 'APO02')!;
const dss05 = dfResults.find((r) => r.objectiveId === 'DSS05')!;

assertEq('EDM01 Relative Score', edm01.scoreDF1, 5);
assertEq('EDM02 Relative Score', edm02.scoreDF1, 30);
assertEq('EDM03 Relative Score', edm03.scoreDF1, 25);
assertEq('APO02 Relative Score', apo02.scoreDF1, -20);
assertEq('DSS05 Relative Score', dss05.scoreDF1, 35); // In Takel matrix row 40 DSS05 is 35 (PRD lists ~30-35)

// ----------------------------------------------------
// TEST CASE 2: Full Benchmark Canvas Normalization
// ----------------------------------------------------
console.log('\n[TEST 2] Full Benchmark Canvas Normalization');
const benchmarkResults = calculateDesignFactors(
  BENCHMARK_ASSESSMENT_STATE.df1,
  BENCHMARK_ASSESSMENT_STATE.df2,
  BENCHMARK_ASSESSMENT_STATE.df3,
  BENCHMARK_ASSESSMENT_STATE.df4,
  BENCHMARK_ASSESSMENT_STATE.weights
);

const bEDM03 = benchmarkResults.find((r) => r.objectiveId === 'EDM03')!;
const bAPO12 = benchmarkResults.find((r) => r.objectiveId === 'APO12')!;
const bDSS04 = benchmarkResults.find((r) => r.objectiveId === 'DSS04')!;
const bDSS05 = benchmarkResults.find((r) => r.objectiveId === 'DSS05')!;
const bMEA03 = benchmarkResults.find((r) => r.objectiveId === 'MEA03')!;

console.log(`  EDM03: Normalized = ${bEDM03.normalizedScore}, Target = ${bEDM03.suggestedTargetLevel}`);
console.log(`  APO12: Normalized = ${bAPO12.normalizedScore}, Target = ${bAPO12.suggestedTargetLevel}`);
console.log(`  DSS04: Normalized = ${bDSS04.normalizedScore}, Target = ${bDSS04.suggestedTargetLevel}`);
console.log(`  DSS05: Normalized = ${bDSS05.normalizedScore}, Target = ${bDSS05.suggestedTargetLevel}`);
console.log(`  MEA03: Normalized = ${bMEA03.normalizedScore}, Target = ${bMEA03.suggestedTargetLevel}`);

assertEq('EDM03 Normalized Score', bEDM03.normalizedScore, 20);
assertEq('EDM03 Suggested Target', bEDM03.suggestedTargetLevel, 1); // < 25 is 1, in scoping user can set to 2
assertEq('DSS04 Suggested Target >= 3', bDSS04.suggestedTargetLevel >= 3, true);
assertEq('DSS05 Suggested Target >= 3', bDSS05.suggestedTargetLevel >= 3, true);

// ----------------------------------------------------
// TEST CASE 3: CPM Fulfillment & Stop Here Rule (DSS05)
// ----------------------------------------------------
console.log('\n[TEST 3] CPM Fulfillment & Stop Here Rule (DSS05)');
const mockActivitiesDSS05: AssessmentActivity[] = [
  {
    id: 'DSS05.01-2',
    activityNumber: 1,
    level: 2,
    description: 'Install and activate malicious software protection tools',
    response: 'Partially',
    comment: 'Server only',
    evidenceIds: [],
  },
  {
    id: 'DSS05.02-2',
    activityNumber: 2,
    level: 2,
    description: 'Filter incoming traffic',
    response: 'Partially',
    comment: 'Zimbra email',
    evidenceIds: [],
  },
  {
    id: 'DSS05.03-3',
    activityNumber: 3,
    level: 3,
    description: 'Communicate awareness',
    response: 'N.A.',
    comment: '',
    evidenceIds: [],
  },
];

const lvl2Result = evaluateActivitiesByLevel(mockActivitiesDSS05, 2);
assertEq('DSS05 Level 2 Valid Count', lvl2Result.validCount, 2);
assertEq('DSS05 Level 2 Total Score', lvl2Result.totalScore, 1.0);
assertEq('DSS05 Level 2 Percentage', lvl2Result.fulfillmentPercentage, 0.5);
assertEq('DSS05 Level 2 CPM Rating', lvl2Result.cpmRating, 'P');
assertEq('DSS05 Level 2 Status', lvl2Result.status, 'Stop Here!');

const dss05Assessment = calculateObjectiveAssessment('DSS05', 4, mockActivitiesDSS05);
assertEq('DSS05 Current Capability Level', dss05Assessment.currentLevel, 1);
assertEq('DSS05 Target Level', dss05Assessment.targetLevel, 4);
assertEq('DSS05 Gap', dss05Assessment.gap, 3);

console.log('\n=============================================');
console.log('🎉 ALL BENCHMARK ENGINE TESTS PASSED PERFECTLY!');
console.log('=============================================\n');
