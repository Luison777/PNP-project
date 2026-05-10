/** Duración de cada escena en segundos */
export const SCENE_DURATIONS_S = {
  scene1: 16,
  scene2: 11,
  scene3: 8,
  scene4: 15,
  scene5: 12,
  scene6: 10,
  scene7: 8,
  scene8: 8,
  scene9: 7,
  scene10: 12,
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
