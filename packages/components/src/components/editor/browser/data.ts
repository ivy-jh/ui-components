import { IvyIcons } from '@axonivy/ui-icons';
import { useBrowser, type BrowserNode } from './browser';
import { useState } from 'react';
import type { Row } from '@tanstack/react-table';

export const useAttrBrowser = () => {
  const [attr, setAttr] = useState<Array<BrowserNode>>([
    {
      value: 'param',
      info: '<> (not selectable)',
      icon: IvyIcons.Attribute,
      isLoaded: true,
      notSelectable: true,
      children: [
        {
          value: 'out',
          info: 'ProcurementRequest',
          icon: IvyIcons.Attribute,
          isLoaded: true,
          children: [
            { value: 'accepted', info: 'Boolean', icon: IvyIcons.Attribute, children: [] },
            {
              value: 'requester',
              info: 'User',
              icon: IvyIcons.Attribute,
              isLoaded: false,
              children: []
            }
          ]
        }
      ]
    }
  ]);

  const loadChildrenFor = (tree: Array<BrowserNode>): Array<BrowserNode> => {
    return tree.map(node => {
      if (node.isLoaded === false) {
        node.children = [
          { value: 'email', info: 'String', icon: IvyIcons.Attribute, children: [] },
          { value: 'fullName', info: 'String', icon: IvyIcons.Attribute, children: [] },
          { value: 'role', info: 'String', icon: IvyIcons.Attribute, children: [] }
        ];
        node.isLoaded = true;
      } else {
        loadChildrenFor(node.children);
      }
      return node;
    });
  };

  const loadLazy = (row: Row<BrowserNode>) => {
    setAttr(old => loadChildrenFor(old));
    console.log('lazy load attrs for ', row.original.value);
  };

  return useBrowser(attr, { loadChildren: loadLazy });
};

export const funcData: Array<BrowserNode> = [
  {
    value: 'ivy',
    info: 'Ivy',
    icon: IvyIcons.FolderOpen,
    children: [
      {
        value: 'cms',
        info: 'ContentManagement',
        icon: IvyIcons.FolderOpen,
        children: [
          { value: 'co(String)', info: 'String', icon: IvyIcons.Function, children: [] },
          {
            value: 'root()',
            info: 'ContentObject',
            icon: IvyIcons.Function,
            children: [{ value: 'child()', info: 'ContentObjectChildAccessor', icon: IvyIcons.Function, children: [] }]
          }
        ]
      },
      {
        value: 'var',
        info: 'IGlobalVariableContext',
        icon: IvyIcons.FolderOpen,
        children: [{ value: 'all()', info: 'List', icon: IvyIcons.Function, children: [] }]
      },
      {
        value: 'wf',
        info: 'IWorkflowContext',
        icon: IvyIcons.FolderOpen,
        children: [
          {
            value: 'currnt()',
            info: 'IWorkflowContext',
            icon: IvyIcons.Function,
            children: []
          }
        ]
      }
    ]
  }
];

export const roleData: Array<BrowserNode> = [
  {
    value: 'Everybody',
    info: 'Everybody',
    icon: IvyIcons.Users,
    children: [
      {
        value: 'Employee',
        info: 'All employees',
        icon: IvyIcons.Users,
        children: [{ value: 'Developer', info: 'ivy team', icon: IvyIcons.Users, children: [] }]
      },
      { value: 'Teamleader', info: 'All teamleaders', icon: IvyIcons.Users, children: [] },
      {
        value: 'Boss',
        info: "All bosses with a very long description text that don't fit into the cell. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text. This is a long text.",
        icon: IvyIcons.Users,
        children: []
      }
    ]
  }
];

type CmsBrowserNode = Omit<BrowserNode, 'children'> & { children: Array<CmsBrowserNode>; cmsValues: Record<string, string> };

export const isCmsBrowserNode = (node: BrowserNode): node is CmsBrowserNode => 'cmsValues' in node;

export const cmsData: Array<CmsBrowserNode> = [
  {
    value: 'workflow-demos',
    info: 'FOLDER',
    icon: IvyIcons.FolderOpen,
    children: [
      {
        value: 'Emails',
        info: 'FOLDER',
        icon: IvyIcons.FolderOpen,
        children: [
          { value: 'accepted', info: 'STRING', icon: IvyIcons.ChangeType, children: [], cmsValues: { de: 'akzeptiert', en: 'accepted' } },
          { value: 'declined', info: 'STRING', icon: IvyIcons.ChangeType, children: [], cmsValues: { de: 'abgelehnt', en: 'declined' } },
          { value: 'pending', info: 'STRING', icon: IvyIcons.ChangeType, children: [], cmsValues: { de: 'ausstehend', en: 'pending' } },
          { value: 'processed', info: 'STRING', icon: IvyIcons.ChangeType, children: [], cmsValues: { de: 'bearbeitet', en: 'processed' } },
          { value: 'rejected', info: 'STRING', icon: IvyIcons.ChangeType, children: [], cmsValues: { de: 'zurück', en: 'rejected' } },
          { value: 'confirmed', info: 'STRING', icon: IvyIcons.ChangeType, children: [], cmsValues: { de: 'bestätigt', en: 'confirmed' } },
          { value: 'archived', info: 'STRING', icon: IvyIcons.ChangeType, children: [], cmsValues: { de: 'archiviert', en: 'archived' } },
          { value: 'draft', info: 'STRING', icon: IvyIcons.ChangeType, children: [], cmsValues: { de: 'Entwurf', en: 'draft' } }
        ],
        cmsValues: {}
      },
      {
        value: 'Images',
        info: 'FOLDER',
        icon: IvyIcons.FolderOpen,
        children: [{ value: 'Logo', info: 'FILE', icon: IvyIcons.File, children: [], cmsValues: {} }],
        cmsValues: {}
      }
    ],
    cmsValues: {}
  }
];
