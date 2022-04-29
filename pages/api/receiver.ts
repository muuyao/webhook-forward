// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import {
  actionMap,
  ActionMapKey,
  assemblyMergeRequestContent,
  repositoryConfigs,
  RepositoryConfigsKey,
} from '../../utils/format';

type Data = {
  success: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const body = req.body;
  const headers = req.headers;
  const {
    event_type,
    repository: { name },
    object_attributes: { action },
  } = body;
  // 只处理 gitlab merge request
  if (
    headers['x-gitlab-event'] &&
    event_type === 'merge_request' &&
    repositoryConfigs[name as RepositoryConfigsKey] &&
    actionMap[action as ActionMapKey]
  ) {
    const { larkHook } = repositoryConfigs[name as RepositoryConfigsKey];
    await axios.post(larkHook, assemblyMergeRequestContent(body));
  }

  res.status(200).json({
    success: true,
  });
}
