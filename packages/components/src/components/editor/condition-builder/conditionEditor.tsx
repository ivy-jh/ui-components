import { IvyIcons } from '@axonivy/ui-icons';
import { BasicSelect } from '@/components/common/select/select';
import { Flex } from '@/components/common/flex/flex';
import { Button } from '@/components/common/button/button';
import { conditionModes, useConditionContext, type ConditionMode } from './conditionContext';
import { ConditionGroup } from './conditionGroup';

const ConditionEditor = () => {
  const { addConditionGroup, conditionGroups, conditionMode, setConditionMode } = useConditionContext();
  return (
    <Flex direction='column' gap={2}>
      <BasicSelect items={conditionModes} value={conditionMode} onValueChange={val => setConditionMode(val as ConditionMode)} />
      {conditionMode !== 'always-true' &&
        conditionMode !== 'always-false' &&
        conditionGroups
          .filter((group, groupIndex) => !(conditionMode === 'basic-condition' && groupIndex > 0))
          .map((group, groupIndex) => (
            <ConditionGroup key={groupIndex} group={group} groupIndex={groupIndex} groupCount={conditionGroups.length} />
          ))}
      {conditionMode === 'nested-condition' && (
        <Button onClick={addConditionGroup} icon={IvyIcons.Plus} aria-label='Add Condition Group' variant='outline'>
          Add Condition Group
        </Button>
      )}
      {conditionMode === 'basic-condition' && conditionGroups.length === 0 && (
        <Button onClick={addConditionGroup} icon={IvyIcons.Plus} aria-label='Add Condition' variant='outline'>
          Add Condition
        </Button>
      )}
    </Flex>
  );
};
ConditionEditor.displayName = 'ConditionEditor';

export { ConditionEditor };
