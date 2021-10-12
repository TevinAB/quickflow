import WidgetTitle from '.';
import { ComponentMeta, ComponentStory } from '@storybook/react';
export default {
  title: 'Component/WidgetTitle',
  component: WidgetTitle,
} as ComponentMeta<typeof WidgetTitle>;

const Template: ComponentStory<typeof WidgetTitle> = (args) => (
  <WidgetTitle {...args}>
    <>
      <div style={{ fontWeight: 700 }}>Title..</div>
      <div style={{ fontWeight: 700 }}>Options</div>
      <div style={{ fontWeight: 700 }}>Option</div>
    </>
  </WidgetTitle>
);

export const NoBorder = Template.bind({});
NoBorder.args = {};

export const BorderBottom = Template.bind({});
BorderBottom.args = {};
