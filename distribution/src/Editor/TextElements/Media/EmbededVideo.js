'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EmbedVideoProviders = require('./EmbedVideoProviders');

var _EmbedVideoProviders2 = _interopRequireDefault(_EmbedVideoProviders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getEmbededURL(url) {
  var _embededURL = "";

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _EmbedVideoProviders2.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var provider = _step.value;

      if (url.indexOf(provider.name) !== -1) return _embededURL = provider.convertURL(url);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return _embededURL;
}

var HTML5Video = function HTML5Video(_ref) {
  var source = _ref.source;

  return _react2.default.createElement('video', { width: '420', height: '345', controls: true, src: source });
};

var EmbededVideo = function EmbededVideo(_ref2) {
  var src = _ref2.src;


  if (src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".ogg")) return _react2.default.createElement(HTML5Video, { source: src });

  var embedURL = getEmbededURL(src);

  return _react2.default.createElement('iframe', {
    title: embedURL,
    src: embedURL,
    width: '420',
    height: '345',
    frameBorder: '0',
    allowFullScreen: true
  });
};

exports.default = EmbededVideo;