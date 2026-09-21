export const gameEndingByScore = {
  1: 'good',
  2: 'normal',
  3: 'bad',
}

export const gameEndingInfo = {
  good: {
    label: '好结局',
    description: '五天的生活选择收获了好结果。',
  },
  normal: {
    label: '一般结局',
    description: '五天的生活选择还有继续调整的空间。',
  },
  bad: {
    label: '坏结局',
    description: '五天的生活选择提醒你重新关注自己的状态。',
  },
}

export const resolveGameEnding = (score) => gameEndingByScore[score] ?? 'normal'
