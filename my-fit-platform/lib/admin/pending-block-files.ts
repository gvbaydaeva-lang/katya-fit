/** Файлы, выбранные в форме и загружаемые в Storage при сохранении урока. */
export type PendingBlockFilesMap = Record<
  string,
  { file: File; folder: "workouts/videos" | "workouts/materials" }
>;
