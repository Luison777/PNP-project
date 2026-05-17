/** Duración de cada escena en segundos */
export const SCENE_DURATIONS_S = {
  scene1: 14,
  scene2: 11,
  scene3: 8,
  scene4: 13,
  scene5: 14,
  scene6: 15,
  scene7: 11,
  scene8: 8,
  scene9: 8,
  scene10: 11,
} as const;

export const TOTAL_DURATION_S =
  SCENE_DURATIONS_S.scene1 +
  SCENE_DURATIONS_S.scene2 +
  SCENE_DURATIONS_S.scene3 +
  SCENE_DURATIONS_S.scene4 +
  SCENE_DURATIONS_S.scene5 +
  SCENE_DURATIONS_S.scene6 +
  SCENE_DURATIONS_S.scene7 +
  SCENE_DURATIONS_S.scene8 +
  SCENE_DURATIONS_S.scene9 +
  SCENE_DURATIONS_S.scene10;
