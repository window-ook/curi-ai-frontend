import TaskContainer from '@/components/task/TaskContainer';
import { Navbar } from '@/components/shared/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16">
        <TaskContainer />
      </main>
    </div>
  );
}
