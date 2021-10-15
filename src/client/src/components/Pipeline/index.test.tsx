import Pipeline from '.';
import { render, fireEvent } from '@testing-library/react';

const pipelineData = {
  stages: [
    {
      stageName: 'Start',
      order: 1,
    },
    {
      stageName: 'Meeting',
      order: 2,
    },
    {
      stageName: 'Almost There',
      order: 3,
    },
    {
      stageName: 'deal completed',
      order: 4,
    },
  ],
  name: 'Deal',
  _id: '615f6f9f48433fa23084ef16',
};

const firstStage = pipelineData.stages[0];

describe('<Pipeline/>', () => {
  it('should render', () => {
    const { getByText } = render(
      <Pipeline
        onStageChange={(_) => {
          return;
        }}
        pipeline={pipelineData}
        currentStage={1}
      />
    );
    getByText(pipelineData.stages[0].stageName);
  });

  it('should render all stages', () => {
    const { getByText } = render(
      <Pipeline
        onStageChange={(n) => {
          return;
        }}
        pipeline={pipelineData}
        currentStage={1}
      />
    );

    pipelineData.stages.map((stage) => getByText(firstStage.stageName));
  });

  it('should handle stage change', () => {
    const onStageChange = jest.fn();

    const { getByText } = render(
      <Pipeline
        onStageChange={onStageChange}
        pipeline={pipelineData}
        currentStage={1}
      />
    );

    const stage = getByText(firstStage.stageName);

    fireEvent.click(stage);

    expect(onStageChange).toBeCalledTimes(1);
    expect(onStageChange).toBeCalledWith(firstStage.order);
  });
});
