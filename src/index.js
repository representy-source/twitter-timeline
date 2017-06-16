import _ from 'lodash';
import HTML from 'representy-source-html';
import pkg from '../package.json';

class TwitterTimeline {
  constructor(options) {
    this.options = options || {};
  }

  static getMarkup(option) {
    const key = _.kebabCase(option);
    return `
    <% if (typeof ${option} !== 'undefined') { %>
      data-${key}="<%= ${option} %>" 
    <% } %>`;
  }

  static getTemplate(options) {
    const getMarkup = TwitterTimeline.getMarkup;
    const username = '<%= username %>';
    const params = _.keys(options).map(key => `${getMarkup(key)}`).join('\n');
    return `
      <a class="twitter-timeline" 
      ${params} 
      href="https://twitter.com/${username}">Tweets by ${username}</a> 
      <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
    `;
  }

  static cleanMarkup(markup) {
    return markup.replace(/\n/g, '').split('  ').join('');
  }

  load() {
    if (_.isEmpty(this.options.username)) {
      throw new Error(`username is required for ${pkg.name}`);
    }
    const html = new HTML({
      engine: 'ejs',
      template: TwitterTimeline.getTemplate(this.options),
      data: this.options,
    });
    return TwitterTimeline.cleanMarkup(html.load());
  }
}

export default TwitterTimeline;
export { TwitterTimeline as Source };
