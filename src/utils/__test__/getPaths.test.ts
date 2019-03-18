import getPaths from '../getPaths';
import * as swagger from './testSwagger.json';

it('test getPaths', () => {
  let paths = swagger['paths'];
  let definitions = swagger['definitions'];
  let obj = getPaths(paths, definitions);
  let str = JSON.stringify(obj);

  const transformObj = {
    'get': {
      'tags': [
        'strategy'
      ],
      'summary': '获取威胁类型（攻击行为）',
      'description': '获取威胁类型（攻击行为）',
      'consumes': [
        'application/json'
      ],
      'produces': [
        'application/json'
      ],
      'parameters': [
        {
          'in': 'header',
          'name': 'access-token',
          'type': 'string',
          'description': '用户验证用户请求权限的密令',
          'required': true
        }
      ],
      'responses': {
        '200': {
          'description': 'OK',
          'schema': {
            'type': 'object',
            'properties': {
              'status': {
                'type': 'integer',
                'description': '请求结果的状态 1表示请求成功 负值表示其他失败的情况',
                'enum': [
                  1,
                  -1
                ],
                'message': {
                  'type': 'string',
                  'example': '错误信息',
                  'description': '请求返回的status不为1时 该值为错误的信息内容'
                },
                'payload': {
                  'type': 'object',
                  'properties': {
                    'data': {
                      'type': 'array',
                      'items': {
                        'type': 'object',
                        'properties': {
                          'isUserDefined': {
                            'type': 'integer',
                            'enum': [
                              1,
                              0
                            ]
                          },
                          'key': {
                            'type': 'string'
                          },
                          'level': {
                            'type': 'string',
                            'enum': [
                              'low',
                              'middle',
                              'high'
                            ]
                          },
                          'type': {
                            'type': 'string'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    'post': {
      'tags': [
        'strategy'
      ],
      'summary': '添加威胁类型（攻击行为）',
      'description': '添加威胁类型（攻击行为',
      'consumes': [
        'application/json'
      ],
      'produces': [
        'application/json'
      ],
      'parameters': [
        {
          'in': 'header',
          'name': 'access-token',
          'type': 'string',
          'description': '用户验证用户请求权限的密令',
          'required': true
        },
        {
          'in': 'body',
          'name': 'body',
          'required': true,
          'schema': {
            'type': 'object',
            'properties': {
              'isUserDefined': {
                'type': 'integer',
                'enum': [
                  1,
                  0
                ]
              },
              'key': {
                'type': 'string'
              },
              'level': {
                'type': 'string',
                'enum': [
                  'low',
                  'middle',
                  'high'
                ]
              },
              'type': {
                'type': 'string'
              }
            }
          }
        }
      ],
      'responses': {
        '200': {
          'description': 'OK',
          'schema': {
            'type': 'object',
            'properties': {
              'status': {
                'type': 'integer',
                'description': '请求结果的状态 1表示请求成功 负值表示其他失败的情况',
                'enum': [
                  1,
                  -1
                ],
                'message': {
                  'type': 'string',
                  'example': '错误信息',
                  'description': '请求返回的status不为1时 该值为错误的信息内容'
                }
              }
            }
          }
        }
      }
    },
    'put': {
      'tags': [
        'strategy'
      ],
      'summary': '修改威胁类型（攻击行为）',
      'description': '修改威胁类型（攻击行为）',
      'consumes': [
        'application/json'
      ],
      'produces': [
        'application/json'
      ],
      'parameters': [
        {
          'in': 'header',
          'name': 'access-token',
          'type': 'string',
          'description': '用户验证用户请求权限的密令',
          'required': true
        },
        {
          'in': 'body',
          'name': 'body',
          'required': true,
          'schema': {
            'type': 'object',
            'properties': {
              'isUserDefined': {
                'type': 'integer',
                'enum': [
                  1,
                  0
                ]
              },
              'key': {
                'type': 'string'
              },
              'level': {
                'type': 'string',
                'enum': [
                  'low',
                  'middle',
                  'high'
                ]
              },
              'type': {
                'type': 'string'
              }
            }
          }
        }
      ],
      'responses': {
        '200': {
          'description': 'OK',
          'schema': {
            'type': 'object',
            'properties': {
              'status': {
                'type': 'integer',
                'description': '请求结果的状态 1表示请求成功 负值表示其他失败的情况',
                'enum': [
                  1,
                  -1
                ],
                'message': {
                  'type': 'string',
                  'example': '错误信息',
                  'description': '请求返回的status不为1时 该值为错误的信息内容'
                }
              }
            }
          }
        }
      }
    },
    'delete': {
      'tags': [
        'strategy'
      ],
      'summary': '删除威胁类型（攻击行为）',
      'description': '删除威胁类型（攻击行为）',
      'consumes': [
        'application/json'
      ],
      'produces': [
        'application/json'
      ],
      'parameters': [
        {
          'in': 'header',
          'name': 'access-token',
          'type': 'string',
          'description': '用户验证用户请求权限的密令',
          'required': true
        },
        {
          'in': 'query',
          'name': 'key',
          'type': 'string',
          'required': true,
          'description': '规则的唯一id 多个,隔开'
        }
      ],
      'responses': {
        '200': {
          'description': 'OK',
          'schema': {
            'type': 'object',
            'properties': {
              'status': {
                'type': 'integer',
                'description': '请求结果的状态 1表示请求成功 负值表示其他失败的情况',
                'enum': [
                  1,
                  -1
                ]
              },
              'message': {
                'type': 'string',
                'example': '错误信息',
                'description': '请求返回的status不为1时 该值为错误的信息内容'
              }
            }
          }
        }
      }
    }
  };

  expect(str.includes('$ref')).toEqual(false);
  expect(str.includes('definitions')).toEqual(false);
  expect(str.includes('#')).toEqual(false);
  expect(JSON.stringify(transformObj, null, 2)).toEqual(JSON.stringify(transformObj, null, 2));
});