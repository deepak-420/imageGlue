'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.merge = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getMetadata = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(file) {
    var _ref2, width, height, channels, format, hasAlpha;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _sharp2.default)(file).metadata();

          case 2:
            _ref2 = _context.sent;
            width = _ref2.width;
            height = _ref2.height;
            channels = _ref2.channels;
            format = _ref2.format;
            hasAlpha = _ref2.hasAlpha;
            return _context.abrupt('return', { width: width, height: height, channels: channels, format: format, hasAlpha: hasAlpha });

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getMetadata(_x) {
    return _ref.apply(this, arguments);
  };
}();

var createFile = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(file1, file2, opts) {
    var output, image;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            output = opts.output;
            image = (0, _sharp2.default)({ create: opts })[opts.format](output);
            _context2.t0 = _sharp2.default;
            _context2.next = 5;
            return image.toBuffer();

          case 5:
            _context2.t1 = _context2.sent;
            _context2.t2 = file1;
            _context2.t3 = { gravity: _sharp2.default.gravity.north };
            _context2.t4 = opts.format;
            _context2.t5 = output;
            image = (0, _context2.t0)(_context2.t1).overlayWith(_context2.t2, _context2.t3)[_context2.t4](_context2.t5);
            _context2.t6 = _sharp2.default;
            _context2.next = 14;
            return image.toBuffer();

          case 14:
            _context2.t7 = _context2.sent;
            _context2.t8 = file2;
            _context2.t9 = { gravity: _sharp2.default.gravity.south };
            _context2.t10 = opts.format;
            _context2.t11 = output;
            image = (0, _context2.t6)(_context2.t7).overlayWith(_context2.t8, _context2.t9)[_context2.t10](_context2.t11);
            return _context2.abrupt('return', image[opts.format](output).toBuffer());

          case 21:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function createFile(_x2, _x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var resizeImage = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(file, height) {
    var resizedFile, metadata;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _sharp2.default)(file).resize(null, height).toBuffer();

          case 2:
            resizedFile = _context3.sent;
            _context3.next = 5;
            return getMetadata(resizedFile);

          case 5:
            metadata = _context3.sent;
            return _context3.abrupt('return', { file: resizedFile, metadata: metadata });

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function resizeImage(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getOptions(metadata1, metadata2, opts) {
  return {
    width: metadata1.width + metadata2.width,
    height: metadata1.height,
    channels: metadata1.channels,
    format: opts.format ? opts.format : metadata1.format,
    output: opts.output || {},
    background: opts.background ? opts.background : metadata1.hasAlpha ? { r: 0, g: 0, b: 0, alpha: 0 } : {
      r: 255,
      g: 255,
      b: 255
    }
  };
}

var merge = exports.merge = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(files) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _ref6, _ref7, metadata1, metadata2, _ref8, file, metadata, _ref9, _file, _metadata;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(files.filter(function (f) {
              return !!f;
            }).length !== 2)) {
              _context4.next = 2;
              break;
            }

            throw new Error('merge should be called with two parameters');

          case 2:
            _context4.next = 4;
            return _promise2.default.all([getMetadata(files[0]), getMetadata(files[1])]);

          case 4:
            _ref6 = _context4.sent;
            _ref7 = (0, _slicedToArray3.default)(_ref6, 2);
            metadata1 = _ref7[0];
            metadata2 = _ref7[1];

            if (!(metadata1.height > metadata2.height)) {
              _context4.next = 17;
              break;
            }

            _context4.next = 11;
            return resizeImage(files[0], metadata2.height);

          case 11:
            _ref8 = _context4.sent;
            file = _ref8.file;
            metadata = _ref8.metadata;
            return _context4.abrupt('return', createFile(file, files[1], getOptions(metadata, metadata2, opts)));

          case 17:
            if (!(metadata2.height > metadata1.height)) {
              _context4.next = 26;
              break;
            }

            _context4.next = 20;
            return resizeImage(files[1], metadata1.height);

          case 20:
            _ref9 = _context4.sent;
            _file = _ref9.file;
            _metadata = _ref9.metadata;
            return _context4.abrupt('return', createFile(files[0], _file, getOptions(metadata1, _metadata, opts)));

          case 26:
            return _context4.abrupt('return', createFile(files[0], files[1], getOptions(metadata1, metadata2, opts)));

          case 27:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function merge(_x8) {
    return _ref5.apply(this, arguments);
  };
}();