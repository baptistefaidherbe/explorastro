const client = require("../database");

const dataExploration = {
  getExplorationsRequest: (callback) => {
    const explorations_query = {
      text: `SELECT
      exploration.id,
      exploration.name, 
      exploration.description,
      exploration.author_id,
      userEvent.username,
      exploration.geog,
      exploration.date,
      exploration.max_participants,
      exploration.is_published,
      exploration.image_url,
      exploration.departement,
      json_build_object(
      'username', json_agg(distinct(u.username)),
       'commentaire', json_agg(distinct(comment.id) || ', ' || comment.content )) participants
              FROM exploration 
              FULL JOIN participate on exploration.id = participate.exploration_id
              FULL JOIN "user" as u on u.id = participate.user_id
              FULL JOIN comment on comment.exploration_id = exploration.id
              FULL JOIN exploration as explor on explor.author_id = u.id
              FULL JOIN "user" as userEvent on exploration.author_id = userEvent.id
              WHERE exploration.id IS NOT NULL
              AND exploration.is_published = 'true'
              group by (exploration.id,userEvent.username);`,
    };

    client.query(explorations_query, callback);
  },
  getExplorationByIdRequest: (id, callback) => {
    const explorationByID_query = {
      text: `SELECT
      exploration.id,
      exploration.name, 
      exploration.description,
      exploration.author_id,
      u.username,
      geog,
      exploration.date,
      exploration.max_participants,
      exploration.is_published,
      exploration.image_url,
      exploration.departement,
      json_agg(distinct(public.user.username)) participants,
      (   SELECT
        json_build_object(
        'comment',json_agg(comment),
        'author', json_agg(u.username))
        FROM "comment"
        FULL JOIN exploration on comment.exploration_id = exploration.id
        FULL JOIN "user" u on comment.author_id = u.id
        WHERE exploration.id = $1
        AND comment.id IS NOT NULL
      )
      FROM exploration 
      FULL JOIN participate on exploration.id = participate.exploration_id
      FULL JOIN public.user on public.user.id = participate.user_id
      FULL JOIN "user" as u on u.id = exploration.author_id
      WHERE exploration.id IS NOT NULL
      AND exploration.id = $1
      group by (exploration.id, u.username);`,

      values: [id],
    };
    client.query(explorationByID_query, callback);
  },
  deleteExplorationRequest: (id, callback) => {
    const deleteExploration_query = {
      text: 'DELETE from "exploration" WHERE "id" = $1;',
      values: [id],
    };
    client.query(deleteExploration_query, callback);
  },
  createExplorationRequest: (name, author_id, callback) => {
    const createExploration_query = {
      text: `
                INSERT INTO "exploration"
                    (name, author_id)
                VALUES
                    ($1, $2);`,
      values: [name, author_id],
    };
    client.query(createExploration_query, callback);
  },
  updateExplorationRequest: (
    id,
    name,
    description,
    geog,
    date,
    max_participants,
    is_published,
    image_url,
    departement,
    callback
  ) => {
    const updateExploration_query = {
      text: `
        UPDATE exploration
        SET name = $2,
        description = $3,
        geog = $4,
        date= $5,
        max_participants= $6,
        is_published= $7,
        image_url=$8,
        departement=$9
        WHERE id= $1;`,
      values: [
        id,
        name,
        description,
        geog,
        date,
        max_participants,
        is_published,
        image_url,
        departement
      ],
    };
    client.query(updateExploration_query, callback);
  },
};
module.exports = dataExploration;
