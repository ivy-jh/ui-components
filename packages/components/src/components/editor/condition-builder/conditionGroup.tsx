import { IvyIcons } from '@axonivy/ui-icons';
import { BasicSelect } from '@/components/common/select/select';
import { Flex } from '@/components/common/flex/flex';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/common/button/button';
import { conditionGroupBorder } from './conditionBuilder.css';
import { Condition, type ConditionProps } from './condition';
import { useConditionContext, type ConditionGroupData, type LogicOperator } from './conditionContext';

interface ConditionGroupProps extends Pick<ConditionProps, 'groupIndex'> {
  group: ConditionGroupData;
  groupCount: number;
}

const ConditionGroup = ({ group, groupIndex, groupCount }: ConditionGroupProps) => {
  const { updateLogicalOperator, addCondition, removeConditionGroup, conditionMode, logicalOperatorOptions } = useConditionContext();
  return (
    <Flex direction='column' gap={2} className='ui-condition-builder-group'>
      <Flex direction='column' className={conditionGroupBorder} data-condition-mode={conditionMode} gap={2}>
        {conditionMode === 'nested-condition' && (
          <Flex direction='row' justifyContent='space-between'>
            <Label>{`Group ${groupIndex + 1}`}</Label>
            <Button onClick={() => removeConditionGroup(groupIndex)} icon={IvyIcons.Trash} aria-label='Remove Group' />
          </Flex>
        )}
        {group.conditions.map((condition, conditionIndex) => (
          <Condition
            key={conditionIndex}
            condition={condition}
            conditionIndex={conditionIndex}
            groupIndex={groupIndex}
            conditionsCount={group.conditions.length}
          />
        ))}
        <Button onClick={() => addCondition(groupIndex)} icon={IvyIcons.Plus} aria-label='Add Condition' variant='outline'>
          Add Condition
        </Button>
      </Flex>
      {groupIndex < groupCount - 1 && conditionMode === 'nested-condition' && (
        <BasicSelect
          items={logicalOperatorOptions}
          value={group.logicalOperator}
          onValueChange={val => updateLogicalOperator(groupIndex, val as LogicOperator)}
        />
      )}
    </Flex>
  );
};
ConditionGroup.displayName = 'ConditionGroup';

export { ConditionGroup };
