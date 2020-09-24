"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _katex = _interopRequireDefault(require("katex"));

var _react = _interopRequireWildcard(require("react"));

var _KatexOutput = _interopRequireDefault(require("./KatexOutput"));

var _EditPanel = _interopRequireDefault(require("./EditPanel"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var replaceData = function replaceData(props) {
  var entityKey = props.entityKey,
      data = props.data,
      contentState = props.contentState;
  return contentState.mergeEntityData(entityKey, data);
};

var TeXBlock = function TeXBlock(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      editMode = _useState2[0],
      setEditMode = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      texValue = _useState4[0],
      setTexValue = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      invalidTeX = _useState6[0],
      setInvalidTeX = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      saveMode = _useState8[0],
      setSaveMode = _useState8[1];

  var contentState = props.contentState,
      blockProps = props.blockProps,
      block = props.block;

  var onClick = function onClick() {
    if (editMode) return;
    setEditMode(true);
    setTexValue(getValue());
    startEdit();
  };

  var onValueChange = function onValueChange(evt) {
    var value = evt.target.value;
    var invalid = false;

    try {
      /* eslint-disable */
      _katex.default.__parse(value);
      /* eslint-enable */

    } catch (e) {
      invalid = true;
    } finally {
      setInvalidTeX(invalid);
      setTexValue(value);
    }
  };

  var save = function save() {
    setInvalidTeX(false);
    setEditMode(false);
    setSaveMode(true);
  };

  var startEdit = function startEdit() {
    var key = block.getKey();
    blockProps.onStartEdit(key);
  };

  var remove = function remove() {
    var key = block.getKey();
    blockProps.onRemove(key);
  };

  var getValue = function getValue() {
    var entity = contentState.getEntity(block.getEntityAt(0));
    return entity.getData().content;
  };

  (0, _react.useEffect)(function () {
    if (!editMode && !invalidTeX && saveMode) {
      var editKey = block.getEntityAt(0);
      var _props = {
        entityKey: editKey,
        data: {
          'content': texValue
        },
        contentState: contentState
      };

      var _newState = replaceData(_props);

      blockProps.onFinishEdit(editKey, _newState);
    }
  }, [editMode, invalidTeX, saveMode, block, contentState, texValue]); // TODO: Colapse into one line.

  var texContent = null;

  if (editMode) {
    texContent = invalidTeX ? '' : texValue;
  } else {
    texContent = getValue();
  }

  var className = 'TeXEditor-tex' + (editMode ? ' TeXEditor-activeTeX' : "");
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className
  }, /*#__PURE__*/_react.default.createElement(_KatexOutput.default, {
    content: texContent,
    onClick: onClick
  }), /*#__PURE__*/_react.default.createElement(_EditPanel.default, {
    editMode: editMode,
    onValueChange: onValueChange,
    texValue: texValue,
    invalidTeX: invalidTeX,
    save: save,
    remove: remove
  }));
};

var _default = TeXBlock;
exports.default = _default;