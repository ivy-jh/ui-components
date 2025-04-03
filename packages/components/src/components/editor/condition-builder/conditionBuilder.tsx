import {
  ConditionContext,
  type ConditionData,
  type ConditionGroupData,
  type ConditionMode,
  type LogicOperator,
  type LogicOperators,
  type Operators
} from './conditionContext';
import { ConditionEditor } from './conditionEditor';
import { BasicInput } from '@/components/common/input/input';
import { type ReactNode, useState, useMemo } from 'react';

export interface ConditionBuilderProps {
  onChange: (value: string) => void;
  operators: Operators;
  logicOperators: LogicOperators;
  generateConditionString: (conditionMode: ConditionMode, conditionGroups: Array<ConditionGroupData>) => string;
  argumentInput?: (value: string, onChange: (change: string) => void) => ReactNode;
  children?: ReactNode;
}

const ConditionBuilder = ({
  onChange,
  operators,
  logicOperators,
  generateConditionString,
  argumentInput,
  children
}: ConditionBuilderProps) => {
  const [conditionMode, setConditionMode] = useState<ConditionMode>('basic-condition');
  const [conditionGroups, setConditionGroups] = useState<Array<ConditionGroupData>>([
    { conditions: [{ argument1: '', operator: 'equal to', argument2: '', logicalOperator: 'and' }], logicalOperator: 'and' }
  ]);

  const updateConditionMode = (mode: ConditionMode) => {
    setConditionMode(mode);
    onChange(generateConditionString(mode, conditionGroups));
  };

  const updateConditionGroups = (updater: (old: Array<ConditionGroupData>) => Array<ConditionGroupData>) => {
    setConditionGroups(old => {
      const newGroups = updater(old);
      onChange(generateConditionString(conditionMode, newGroups));
      return newGroups;
    });
  };

  const addConditionGroup = () => {
    updateConditionGroups(old => {
      const newGroups = structuredClone(old);
      newGroups.push({
        conditions: [{ argument1: '', operator: 'equal to', argument2: '', logicalOperator: 'and' }],
        logicalOperator: 'and'
      });
      return newGroups;
    });
  };

  const updateLogicalOperator = (index: number, newValue: LogicOperator) => {
    updateConditionGroups(old => {
      const newGroups = structuredClone(old);
      newGroups[index].logicalOperator = newValue;
      return newGroups;
    });
  };

  const addCondition = (groupIndex: number) => {
    updateConditionGroups(old => {
      const newGroups = structuredClone(old);
      newGroups[groupIndex].conditions.push({ argument1: '', operator: 'equal to', argument2: '', logicalOperator: 'and' });
      return newGroups;
    });
  };

  const removeConditionGroup = (groupIndex: number) => {
    updateConditionGroups(old => {
      const newGroups = structuredClone(old);
      newGroups.splice(groupIndex, 1);
      return newGroups;
    });
  };

  const updateCondition = <TKey extends keyof ConditionData>(
    groupIndex: number,
    conditionIndex: number,
    key: TKey,
    newValue: ConditionData[TKey]
  ) => {
    updateConditionGroups(old => {
      const newGroups = structuredClone(old);
      newGroups[groupIndex].conditions[conditionIndex] = {
        ...newGroups[groupIndex].conditions[conditionIndex],
        [key]: newValue
      };
      return newGroups;
    });
  };

  const removeCondition = (groupIndex: number, conditionIndex: number) => {
    updateConditionGroups(old => {
      const newGroups = structuredClone(old);
      newGroups[groupIndex].conditions.splice(conditionIndex, 1);
      return newGroups;
    });
  };

  const defaultInput = (value: string, onChange: (change: string) => void) => (
    <BasicInput value={value} onChange={e => onChange(e.target.value)} style={{ flex: 1 }} />
  );

  const typeOptions = useMemo(() => Object.entries(operators).map(([label]) => ({ label, value: label })), [operators]);
  const logicalOperatorOptions = useMemo(
    () => Object.entries(logicOperators).map(([label]) => ({ label, value: label })),
    [logicOperators]
  );

  return (
    <ConditionContext.Provider
      value={{
        conditionMode,
        setConditionMode: updateConditionMode,
        conditionGroups,
        addConditionGroup,
        removeConditionGroup,
        addCondition,
        updateCondition,
        removeCondition,
        typeOptions,
        logicalOperatorOptions,
        updateLogicalOperator,
        argumentInput: argumentInput ? argumentInput : defaultInput
      }}
    >
      <ConditionEditor />
      {children}
    </ConditionContext.Provider>
  );
};
ConditionBuilder.displayName = 'ConditionBuilder';

export { ConditionBuilder };
