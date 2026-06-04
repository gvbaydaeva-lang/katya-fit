import { WorkoutForm } from "@/components/admin/WorkoutForm";
import { WorkoutsTable } from "@/components/admin/WorkoutsTable";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { listWorkouts } from "@/lib/admin/workouts";

export default async function AdminContentPage() {
  const workouts = await listWorkouts();

  return (
    <Tabs defaultValue="list" className="w-full min-w-0">
      <TabsList>
        <TabsTrigger value="form">Добавить урок</TabsTrigger>
        <TabsTrigger value="list">Список уроков</TabsTrigger>
      </TabsList>

      <TabsContent value="form">
        <div className="rounded-xl border-none bg-ds-surface px-5 py-6 text-center shadow-sm">
          <p className="text-sm text-ds-muted">
            Откройте широкий конструктор, чтобы собрать урок из блоков текста,
            видео и файлов.
          </p>
          <div className="mt-3 flex justify-center">
            <WorkoutForm />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="list" className="w-full min-w-0">
        <WorkoutsTable workouts={workouts} />
      </TabsContent>
    </Tabs>
  );
}
