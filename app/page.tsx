import TaskContainer from '@/components/task/TaskContainer';
import { Navbar } from '@/components/layout/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen pt-16 bg-white">
      <Navbar />
      <TaskContainer />
    </main>
  );
}
