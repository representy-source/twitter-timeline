'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Source = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _representySourceHtml = require('representy-source-html');

var _representySourceHtml2 = _interopRequireDefault(_representySourceHtml);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TwitterTimeline {
  constructor(options) {
    this.options = options || {};
  }

  static getMarkup(option) {
    const key = _lodash2.default.kebabCase(option);
    return `
    <% if (typeof ${option} !== 'undefined') { %>
      data-${key}="<%= ${option} %>" 
    <% } %>`;
  }

  static getTemplate(options) {
    const getMarkup = TwitterTimeline.getMarkup;
    const username = '<%= username %>';
    const params = _lodash2.default.keys(options).map(key => `${getMarkup(key)}`).join('\n');
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
    if (_lodash2.default.isEmpty(this.options.username)) {
      throw new Error(`username is required for ${_package2.default.name}`);
    }
    const html = new _representySourceHtml2.default({
      engine: 'ejs',
      template: TwitterTimeline.getTemplate(this.options),
      data: this.options
    });
    return TwitterTimeline.cleanMarkup(html.load());
  }
}

exports.default = TwitterTimeline;
exports.Source = TwitterTimeline;