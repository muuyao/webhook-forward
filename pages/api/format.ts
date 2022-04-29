function getResult(body: any) {
  const { event_type, user, repository, object_attributes } = body;
  const result = {
    title: '',
    content: '',
    url: '',
  };

  return result;
}

export const actionMap = {
  open: '有新的 Merge Request',
  merge: 'Merge Request 已合并',
  update: 'Merge Request 更新了',
};

export const userNameMap = {
  wanngxiao: {
    name: '王晓',
  },
  register2019: {
    name: '顾升权',
  },
  zhuangxk: {
    name: '庄新凯',
  },
};

export const repositoryConfigs = {
  'iiots-web-3.0': {
    larkHook: 'https://open.feishu.cn/open-apis/bot/v2/hook/db3c5890-fe9d-451f-818d-0d06193c5c28',
  },
  'iiots-web-2.0': {
    larkHook: 'https://open.feishu.cn/open-apis/bot/v2/hook/db3c5890-fe9d-451f-818d-0d06193c5c28',
  },
  'iiots-app-3.0': {
    larkHook: 'https://open.feishu.cn/open-apis/bot/v2/hook/db3c5890-fe9d-451f-818d-0d06193c5c28',
  },
  'iiots-mobile-web-3.0': {
    larkHook: 'https://open.feishu.cn/open-apis/bot/v2/hook/db3c5890-fe9d-451f-818d-0d06193c5c28',
  },
};

export type UserNameMapKey = keyof typeof userNameMap;
export type ActionMapKey = keyof typeof actionMap;
export type RepositoryConfigsKey = keyof typeof repositoryConfigs;

/**
 * 组装
 * @param body
 * @returns
 */
export function assemblyMergeRequestContent(body: any) {
  const {
    user,
    repository: { name: repositoryName },
    object_attributes: { title, url, action, assignee },
  } = body;

  return {
    msg_type: 'interactive',
    card: {
      config: {
        wide_screen_mode: true,
        enable_forward: true,
      },
      elements: [
        {
          tag: 'div',
          text: {
            content: `标题：**${title}**\n操作人：**${userNameMap[user?.username as UserNameMapKey]}**\n审核人：**${
              userNameMap[assignee?.username as UserNameMapKey]
            }**\n\n<at id=all></at>`,
            tag: 'lark_md',
          },
        },
        {
          actions: [
            {
              tag: 'button',
              text: {
                content: '查看',
                tag: 'plain_text',
              },
              url: url,
              type: 'default',
            },
          ],
          tag: 'action',
        },
      ],
      header: {
        title: {
          content: `${repositoryName} ${actionMap[action as ActionMapKey]}`,
          tag: 'plain_text',
        },
      },
    },
  };
}
