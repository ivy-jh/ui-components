import { composeStory } from '@storybook/react';
import { render, screen, userEvent, waitFor } from 'test-utils';
import Meta, { Default, DialogBrowser, DialogBrowserWithTitle } from './browser.stories';

const Browser = composeStory(Default, Meta);
const Dialog = composeStory(DialogBrowser, Meta);
const TitleDialog = composeStory(DialogBrowserWithTitle, Meta);

window.alert = vi.fn();

afterEach(() => {
  vi.resetAllMocks();
});

test('apply', async () => {
  render(<Browser />);
  await userEvent.click(screen.getAllByRole('row')[2]);
  await userEvent.click(screen.getByRole('button', { name: 'Apply' }));
  expect(window.alert).toBeCalledWith(`Browser 'Roles' apply: Teamleader`);
});

test('double click', async () => {
  render(<Browser />);
  await userEvent.dblClick(screen.getAllByRole('row')[0]);
  expect(window.alert).toBeCalledWith(`Browser 'Roles' apply: Everybody`);
});

test('apply modifier', async () => {
  render(<Browser />);
  await userEvent.click(screen.getByRole('tab', { name: 'CMS' }));
  await userEvent.dblClick(screen.getByRole('row', { name: 'Emails FOLDER' }));
  expect(window.alert).toBeCalledWith(`Browser 'CMS' apply: <%= ivy.co('Emails') %>`);
});

test('info provider', async () => {
  render(<Browser />);
  await userEvent.click(screen.getByRole('button', { name: 'Info' }));
  expect(screen.getByRole('region')).toHaveTextContent('Teamleader');

  await userEvent.click(screen.getByRole('row', { name: 'Teamleader All teamleaders' }));
  expect(screen.getByRole('region')).toHaveTextContent('Teamleader');

  await userEvent.click(screen.getByRole('tab', { name: 'Attribute' }));
  expect(screen.getByRole('region')).toHaveTextContent('');

  await userEvent.click(screen.getByRole('row', { name: 'out ProcurementRequest' }));
  expect(screen.getByRole('region')).toHaveTextContent('out');

  await userEvent.click(screen.getByRole('tab', { name: 'Roles' }));
  expect(screen.getByRole('region')).toHaveTextContent('Teamleader');
});

test('info provider - more data', async () => {
  render(<Browser />);
  await userEvent.click(screen.getByRole('tab', { name: 'CMS' }));
  await userEvent.click(screen.getByRole('button', { name: 'Info' }));
  await userEvent.click(screen.getAllByRole('button', { name: 'Expand row' })[0]);
  await userEvent.click(screen.getByRole('row', { name: 'accepted STRING' }));
  expect(screen.getByRole('region')).toHaveTextContent('acceptedde: akzeptierten: accepted');
});

test('info provider - lazy loaded', async () => {
  render(<Browser />);
  await userEvent.click(screen.getByRole('tab', { name: 'Functions' }));
  await userEvent.click(screen.getByRole('button', { name: 'Info' }));
  await userEvent.click(screen.getByRole('row', { name: 'wf IWorkflowContext' }));
  expect(screen.getByRole('region')).toHaveTextContent('Loading javaDoc from backend...');
  await waitFor(() => expect(screen.getByRole('region')).toHaveTextContent('wfGets the data from bla...Returns: IWorkflowContext'));
});

test('header', async () => {
  render(<Browser />);
  expect(screen.getAllByRole('checkbox')[0]).toHaveAccessibleName('You can also render a checkbox here');
  await userEvent.click(screen.getByRole('tab', { name: 'Attribute' }));
  expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  expect(screen.getByText(`Info: Lazy loaded row 'requester (User)'`)).toBeInTheDocument();
});

test('footer', async () => {
  render(<Browser />);
  expect(screen.getAllByRole('checkbox')[1]).toHaveAccessibleName('You can also render a checkbox here');
  await userEvent.click(screen.getByRole('tab', { name: 'Attribute' }));
  expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
});

test('filter on different browsers', async () => {
  render(<Browser />);
  expect(screen.getAllByRole('row')).toHaveLength(4);
  await userEvent.type(screen.getByRole('textbox'), 'e');
  expect(screen.getAllByRole('row')).toHaveLength(3);

  await userEvent.click(screen.getByRole('tab', { name: 'Attribute' }));
  expect(screen.getByRole('textbox')).toHaveValue('');
  expect(screen.getAllByRole('row')).toHaveLength(2);

  await userEvent.type(screen.getByRole('textbox'), 'asdf');
  expect(screen.getAllByRole('row')).toHaveLength(1);
  expect(screen.getAllByRole('row')[0]).toHaveTextContent('No attributes found');

  await userEvent.click(screen.getByRole('tab', { name: 'Roles' }));
  expect(screen.getByRole('textbox')).toHaveValue('e');
  expect(screen.getAllByRole('row')).toHaveLength(3);

  await userEvent.type(screen.getByRole('textbox'), 'asdf');
  expect(screen.getAllByRole('row')).toHaveLength(1);
  expect(screen.getAllByRole('row')[0]).toHaveTextContent('No results');
});

test('dialog', async () => {
  render(<Dialog />);
  expect(screen.getByRole('textbox')).toHaveValue('');
  await userEvent.click(screen.getByRole('button', { name: 'Browser' }));
  await userEvent.click(screen.getAllByRole('row')[2]);
  await userEvent.click(screen.getByRole('button', { name: 'Apply' }));
  expect(screen.getByRole('textbox')).toHaveValue('Teamleader');
});

test('dialog with initial search', async () => {
  render(<Dialog />);
  await userEvent.type(screen.getByRole('textbox'), 'team');
  await userEvent.click(screen.getByRole('button', { name: 'Browser' }));
  expect(screen.getAllByRole('row')).toHaveLength(2);

  await userEvent.dblClick(screen.getAllByRole('row')[1]);
  expect(screen.getByRole('textbox')).toHaveValue('Teamleader');
});

test('dialog title', async () => {
  render(<TitleDialog />);
  await userEvent.click(screen.getByRole('button', { name: 'Browser' }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Choose a browser...');
});
