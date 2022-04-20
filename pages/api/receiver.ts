// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data = {
  success: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const body = JSON.parse(req.body);
  const headers = req.headers;
  if (headers['x-gitlab-event']) {
    const { event_type, user, repository, object_attributes } = body;
    await axios.post('https://open.feishu.cn/open-apis/bot/v2/hook/db3c5890-fe9d-451f-818d-0d06193c5c28', {
      msg_type: 'post',
      content: {
        post: {
          zh_cn: {
            title: repository.name + ' ' + event_type,
            content: [
              [
                {
                  tag: 'text',
                  text: '提交人: ' + user.name,
                },
                {
                  tag: 'a',
                  text: '请查看',
                  href: object_attributes.url,
                },
              ],
            ],
          },
        },
      },
    });
  }

  res.status(200).json({
    success: true,
  });
}
