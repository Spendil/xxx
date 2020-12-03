"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = void 0;

var _common = require("../../utils/common");

var _vega = _interopRequireDefault(require("vega"));

var _vegaLite = _interopRequireDefault(require("vega-lite"));

var _vegaEmbed = _interopRequireDefault(require("vega-embed"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fetcher = graphQLParams => {
  return fetch('https://graphql.bitquery.io', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(graphQLParams),
    credentials: 'same-origin'
  });
};

const create = async (query, variables, config) => {
  let queryResult = '';
  let cfg = {};
  const data = await fetcher({
    query,
    variables
  });
  data.json().then(json => {
    if ('data' in json) {
      queryResult = json.data;
    } else {
      console.log(JSON.stringify(json.errors, null, 2));
    }
  });
  let values = (0, _common.getValueFrom)(queryResult, config.data);
  cfg = { ...config,
    data: {
      values
    }
  };
  (0, _vegaEmbed.default)('#vis', cfg);
};

exports.create = create;