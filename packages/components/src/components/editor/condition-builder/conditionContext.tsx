import { createContext, useContext, type ReactNode } from 'react';

export const conditionModes = [
  { label: 'Basic Condition', value: 'basic-condition' },
  { label: 'Nested Condition', value: 'nested-condition' },
  { label: 'Always True', value: 'always-true' },
  { label: 'Always False', value: 'always-false' }
] as const;

export type ConditionMode = (typeof conditionModes)[number]['value'];

export interface ConditionData {
  argument1: string;
  operator: Operator;
  argument2: string;
  logicalOperator: LogicOperator;
}

export interface ConditionGroupData {
  conditions: Array<ConditionData>;
  logicalOperator: LogicOperator;
}

export type Operators = {
  'equal to': string;
  'not equal to': string;
  'is true': string;
  'is false': string;
  'is empty': string;
  'is not empty': string;
  'less than': string;
  'greater than': string;
  'less or equal to': string;
  'greater or equal to': string;
};

export type Operator = keyof Operators;

export type LogicOperators = {
  and: string;
  or: string;
};

export type LogicOperator = keyof LogicOperators;

interface ConditionContextType {
  conditionMode: ConditionMode;
  setConditionMode: (value: ConditionMode) => void;
  conditionGroups: Array<ConditionGroupData>;
  addConditionGroup: () => void;
  removeConditionGroup: (groupIndex: number) => void;
  addCondition: (groupIndex: number) => void;
  updateCondition: <TKey extends keyof ConditionData>(
    groupIndex: number,
    conditionIndex: number,
    key: TKey,
    newValue: ConditionData[TKey]
  ) => void;
  removeCondition: (groupIndex: number, conditionIndex: number) => void;
  typeOptions: ReadonlyArray<{ value: string; label: string }>;
  logicalOperatorOptions: ReadonlyArray<{ value: string; label: string }>;
  updateLogicalOperator: (index: number, newValue: LogicOperator) => void;
  argumentInput: (value: string, onChange: (change: string) => void) => ReactNode;
}

export const ConditionContext = createContext<ConditionContextType | undefined>(undefined);

export const useConditionContext = () => {
  const context = useContext(ConditionContext);
  if (!context) {
    throw new Error('useConditionContext must be used within a ConditionContext');
  }
  return context;
};
