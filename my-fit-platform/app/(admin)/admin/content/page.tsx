import { WorkoutForm } from "@/components/admin/WorkoutForm";
import { WorkoutsTable } from "@/components/admin/WorkoutsTable";
import { PageHeading } from "@/components/ui/PageHeading";
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
    <>
      <PageHeading
        title="Контент"
        description="Управление видео-уроками"
      />

      <Tabs defaultValue="form" className="w-full">
        <TabsList>
          <TabsTrigger value="form">Добавить урок</TabsTrigger>
          <TabsTrigger value="list">Список уроков</TabsTrigger>
        </TabsList>

        <TabsContent value="form">
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/80 px-6 py-10 text-center">
            <p className="text-sm text-zinc-600">
              Откройте широкий конструктор, чтобы собрать урок из блоков текста,
              видео и файлов.
            </p>
            <div className="mt-4 flex justify-center">
              <WorkoutForm />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list">
          <WorkoutsTable workouts={workouts} />
        </TabsContent>
      </Tabs>
    </>
  );
}
