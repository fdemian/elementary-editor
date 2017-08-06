'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EmbededVideo = require('./EmbededVideo');

var _EmbededVideo2 = _interopRequireDefault(_EmbededVideo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Media = function Media(props) {

    var entity = props.contentState.getEntity(props.block.getEntityAt(0));

    var _entity$getData = entity.getData(),
        src = _entity$getData.src;

    var type = entity.getType();

    var media = void 0;

    if (type === 'Audio') {
        media = _react2.default.createElement(Audio, { src: src });
    } else if (type === 'Image') {
        media = _react2.default.createElement(Image, { src: src, alt: '' });
    } else if (type === 'Video') {
        media = _react2.default.createElement(_EmbededVideo2.default, { src: src });
    }

    return media;
};

var Audio = function Audio(props) {
    return _react2.default.createElement('audio', { controls: true, src: props.src });
};

var Image = function Image(props) {
    return _react2.default.createElement('img', { src: props.src, alt: '' });
};

exports.default = Media;