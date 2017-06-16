import TwitterWidgetBase from 'representy-source-twitter-widget-base';

// <a class="twitter-timeline"
//     data-lang="tr"
//     data-width="400"
//     data-height="300"
//     data-dnt="true"
//     data-theme="dark"
//     data-link-color="#292"
//   href="https://twitter.com/salimkayabasi">
//     Tweets by salimkayabasi
// </a>

class TwitterTimeline extends TwitterWidgetBase {
  constructor(options) {
    super('timeline', options, [
      'lang',
      'width',
      'height',
      'dnt',
      'theme',
      'linkColor',
    ]);
  }
  // eslint-disable-next-line class-methods-use-this
  getHref() {
    return 'https://twitter.com/<%= username %>';
  }

  // eslint-disable-next-line class-methods-use-this
  getContent() {
    return 'Tweets by <%= username %>';
  }

}

export default TwitterTimeline;
export { TwitterTimeline as Source };
