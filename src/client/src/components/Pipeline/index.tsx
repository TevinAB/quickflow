import './index.css';
import clsx from 'clsx';
import Text from '../Text';

type StageData = {
  stageName: string;
  order: number;
};

type PipelineProps = {
  currentStage: number;
  onStageChange: (stage: number) => void;
  pipeline: {
    _id: string;
    name: string;
    stages: Array<StageData>;
  };
};

export default function Pipeline({
  currentStage,
  onStageChange,
  pipeline,
}: PipelineProps) {
  return (
    <div className="pipeline">
      {pipeline.stages.map((stage) => (
        <PipelineStage
          currentStage={currentStage}
          stageName={stage.stageName}
          order={stage.order}
          onStageChange={onStageChange}
        />
      ))}
    </div>
  );
}

type PipelineStageProps = Omit<PipelineProps, 'pipeline'> & StageData;

function PipelineStage({
  currentStage,
  onStageChange,
  stageName,
  order,
}: PipelineStageProps) {
  const pathClasses = clsx(
    currentStage >= order && 'pipeline__stage--completed'
  );

  return (
    <span className="pipeline__stage" onClick={() => onStageChange(order)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 10">
        <path
          className={pathClasses}
          d="M 0 0 L 22 0 L 26 5 L 22 10 L 0 10 L 3 5"
          fill="#fafafc"
        />
      </svg>
      <Text className="pl-stage__text" color="black">
        {stageName}
      </Text>
    </span>
  );
}
