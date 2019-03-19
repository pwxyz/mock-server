
import mockRes from '../mockRes';

it('test mockRes', () => {
  let obj =  {
    'status': {
      'type': 'integer',
      'description': '请求结果的状态 1表示请求成功 负值表示其他失败的情况',
      'enum': [
        1, -1
      ]
    },
    'message': {
      'type': 'string',
      'example': '错误信息',
      'description': '请求返回的status不为1时 该值为错误的信息内容'
    },
    'data': {
      'type': 'array',
      'items': {
        'name': {
          'type': 'string',
          'kind': 'city',
        },
        'value': {
          'type': 'integer'
        },
        'test': {
          type: 'number'
        }
      }
    }
  };
  let arg = { };
  let limit = 10;

  expect(mockRes(obj, arg, limit)['status']).toEqual(1);
  expect(mockRes(obj, arg, limit)['data']['length']).toEqual(10);
});