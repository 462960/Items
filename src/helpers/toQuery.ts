import map from 'lodash.map';
import compact from 'lodash.compact';
import isNil from 'lodash.isnil';

/**
 * Need to wrote custom solution, because most popular library didn't support nested params
 *
 * Case when we need to querify array of objects not covered
 * I thought, that array of objects in query - it's too much :)
 */

const buildKey = (currentKey: string, prefix: string) => {
  if (prefix) return `${prefix}[${currentKey}]`;
  return currentKey;
};

const propToString = (value: any, currentKey: string, prefix = '') => {
  if (Array.isArray(value)) {
    return (
      buildKey(currentKey, prefix) +
      '=' +
      value.map((arrayValue) => arrayValue).join(',')
    );
  }

  if (value instanceof Object) {
    return compact(
      map(value, (subValue, subKey) =>
        propToString(subValue, subKey, buildKey(currentKey, prefix))
      )
    ).join('&');
  }

  if (isNil(value) || value === '') return '';

  return `${buildKey(currentKey, prefix)}=${value}`;
};

const toQuery = (params) => {
  return compact(map(params, (value, key) => propToString(value, key))).join(
    '&'
  );
};

export default toQuery;
