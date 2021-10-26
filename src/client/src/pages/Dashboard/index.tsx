import './index.css';
import TaskTodayWidget from '../../components/TaskTodayWidget';
import EventTodayWidget from '../../components/EventTodayWidget';
import DealSummaryChartWidget from '../../components/DealSummaryChartWidget';
import DealSummaryWidget from '../../components/DealSummaryWidget';

export default function Dashboard() {
  return (
    <main>
      <div className="dashboard__container">
        <DealSummaryWidget classes="dashboard__span-2" />
        <DealSummaryChartWidget classes="dashboard__span-2" />
        <TaskTodayWidget />
        <EventTodayWidget />
      </div>
    </main>
  );
}
