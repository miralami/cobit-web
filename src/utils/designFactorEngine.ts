import type {
  COBITDomain,
  CapabilityLevel,
  DesignFactorWeights,
  DF1Input,
  DF2Input,
  DF3Input,
  DF4Input,
  DFCalculationResult,
} from '../types';
import cobitFactors from '../data/cobitDesignFactors.json';

export function mround5(val: number): number {
  if (isNaN(val) || !isFinite(val)) return 0;
  return Math.round(val / 5.0) * 5;
}

export function calculateDesignFactors(
  df1: DF1Input,
  df2: DF2Input,
  df3: DF3Input,
  df4: DF4Input,
  weights: DesignFactorWeights = { df1: 2, df2: 1, df3: 3, df4: 4 }
): DFCalculationResult[] {
  // Vector DF1 (4 items)
  const df1Vec = [
    df1.growth || 3,
    df1.innovation || 3,
    df1.costLeadership || 3,
    df1.clientService || 3,
  ];
  const meanDF1 = (df1Vec.reduce((a, b) => a + b, 0)) / 4.0;
  const cfDF1 = meanDF1 > 0 ? 3.0 / meanDF1 : 1.0;

  // Vector DF2 (13 items EG01 - EG13)
  const df2Vec: number[] = [];
  for (let i = 1; i <= 13; i++) {
    const key = `EG${i.toString().padStart(2, '0')}`;
    df2Vec.push(df2.goals[key] ?? 3);
  }
  const meanDF2 = (df2Vec.reduce((a, b) => a + b, 0)) / 13.0;
  const cfDF2 = meanDF2 > 0 ? 3.0 / meanDF2 : 1.0;

  // Vector DF3 (19 items RSK01 - RSK19, rating = impact * likelihood)
  const df3Vec: number[] = [];
  for (let i = 1; i <= 19; i++) {
    const key = `RSK${i.toString().padStart(2, '0')}`;
    const item = df3.risks[key];
    const imp = item?.impact ?? 3;
    const lik = item?.likelihood ?? 3;
    df3Vec.push(imp * lik);
  }
  const meanDF3 = (df3Vec.reduce((a, b) => a + b, 0)) / 19.0;
  const cfDF3 = meanDF3 > 0 ? 9.0 / meanDF3 : 1.0;

  // Vector DF4 (20 items ISS01 - ISS20)
  const df4Vec: number[] = [];
  for (let i = 1; i <= 20; i++) {
    const key = `ISS${i.toString().padStart(2, '0')}`;
    df4Vec.push(df4.issues[key] ?? 2);
  }
  const meanDF4 = (df4Vec.reduce((a, b) => a + b, 0)) / 20.0;
  const cfDF4 = meanDF4 > 0 ? 2.0 / meanDF4 : 1.0;

  const df1Mapping = cobitFactors.df1_mapping;
  const df2Mapping = cobitFactors.df2_mapping;
  const df3Mapping = cobitFactors.df3_mapping;
  const df4Mapping = cobitFactors.df4_mapping;
  const objectives = cobitFactors.objectives;

  const rawResults: {
    objectiveId: string;
    name: string;
    domain: COBITDomain;
    scoreDF1: number;
    scoreDF2: number;
    scoreDF3: number;
    scoreDF4: number;
    totalScore: number;
  }[] = [];

  for (let i = 0; i < 40; i++) {
    const obj = objectives[i];

    // DF1 Score
    const rawDF1 = df1Mapping[i].reduce((sum, w, idx) => sum + w * df1Vec[idx], 0);
    const baseDF1 = df1Mapping[i].reduce((sum, w) => sum + w * 3.0, 0);
    const scoreDF1 = baseDF1 === 0 ? 0 : mround5((cfDF1 * 100 * rawDF1) / baseDF1) - 100;

    // DF2 Score
    const rawDF2 = df2Mapping[i].reduce((sum, w, idx) => sum + w * df2Vec[idx], 0);
    const baseDF2 = df2Mapping[i].reduce((sum, w) => sum + w * 3.0, 0);
    const scoreDF2 = baseDF2 === 0 ? 0 : mround5((cfDF2 * 100 * rawDF2) / baseDF2) - 100;

    // DF3 Score
    const rawDF3 = df3Mapping[i].reduce((sum, w, idx) => sum + w * df3Vec[idx], 0);
    const baseDF3 = df3Mapping[i].reduce((sum, w) => sum + w * 9.0, 0);
    const scoreDF3 = baseDF3 === 0 ? 0 : mround5((cfDF3 * 100 * rawDF3) / baseDF3) - 100;

    // DF4 Score
    const rawDF4 = df4Mapping[i].reduce((sum, w, idx) => sum + w * df4Vec[idx], 0);
    const baseDF4 = df4Mapping[i].reduce((sum, w) => sum + w * 2.0, 0);
    const scoreDF4 = baseDF4 === 0 ? 0 : mround5((cfDF4 * 100 * rawDF4) / baseDF4) - 100;

    // Canvas Step 2 Weighted Total
    const totalScore =
      weights.df1 * scoreDF1 +
      weights.df2 * scoreDF2 +
      weights.df3 * scoreDF3 +
      weights.df4 * scoreDF4;

    rawResults.push({
      objectiveId: obj.id,
      name: obj.name,
      domain: obj.domain as COBITDomain,
      scoreDF1,
      scoreDF2,
      scoreDF3,
      scoreDF4,
      totalScore,
    });
  }

  // MaxScale calculation: max(max(F_k), -min(F_k))
  const allTotals = rawResults.map((r) => r.totalScore);
  const maxTotal = Math.max(...allTotals);
  const minTotal = Math.min(...allTotals);
  const maxScale = Math.max(maxTotal, -minTotal, 1);

  // Normalization and suggested target level
  return rawResults.map((r) => {
    const rawRatio = (100.0 * r.totalScore) / maxScale;
    const truncated = Math.trunc(rawRatio);
    const normalizedScore = mround5(truncated);

    let suggestedTargetLevel: CapabilityLevel = 1;
    if (normalizedScore >= 75) {
      suggestedTargetLevel = 4;
    } else if (normalizedScore >= 50) {
      suggestedTargetLevel = 3;
    } else if (normalizedScore >= 25) {
      suggestedTargetLevel = 2;
    } else {
      suggestedTargetLevel = 1;
    }

    return {
      ...r,
      normalizedScore,
      suggestedTargetLevel,
    };
  });
}
