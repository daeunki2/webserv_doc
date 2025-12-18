// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Intro',
      items: [
        'intro/dont_panic',
        'intro/what-is-the-web',
        'intro/what-is-a-server',
        'intro/port-socket-connection',
        'intro/what-is-webserv-project',
        'intro/how-this-doc-is-organized',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      items: [
        'concepts/what-is-an-event-loop',
        'concepts/poll-vs-select',
        'concepts/http-lifecycle',
        'concepts/cgi-basics',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/global-overview',
        'architecture/server-manager',
        'architecture/client-state-machine',
        'architecture/fd-lifecycle',
      ],
    },
    {
      type: 'category',
      label: 'Deep Dive',
      items: [
        'deep-dive/why-cgi-fd-in-poll',
        'deep-dive/why-two-pipes-for-cgi',
        'deep-dive/timeout-vs-cgi',
        'deep-dive/abort-scenarios',
      ],
    },
    {
      type: 'category',
      label: 'Testing',
      items: [
        'testing/curl-strategy',
        'testing/siege-what-it-proves',
        'testing/tester-behavior',
      ],
    },
    {
      type: 'category',
      label: 'Evaluation',
      items: [
        'evaluation/questions-i-can-answer',
        'evaluation/common-misconceptions',
      ],
    },
  ],
};

export default sidebars;
