const client = require("../database");

const dataExploration = {
  getExplorationsRequest: (callback) => {
    const explorations_query = {
      text: `SELECT
      exploration.id,
      exploration.name, 
      exploration.description,
      exploration.author_id,
      ST_AsGeoJSON(geog) geog,
      exploration.date,
      exploration.max_participants,
      exploration.is_published,
      exploration.image_url,
      ARRAY_AGG(public.user.username) participants
              FROM exploration 
              FULL JOIN participate on exploration.id = participate.exploration_id
              FULL JOIN public.user on public.user.id = participate.user_id
              WHERE exploration.id IS NOT NULL
              group by (exploration.id)
              ;`,
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
      ST_AsGeoJSON(geog) geog,
      exploration.date,
      exploration.max_participants,
      exploration.is_published,
      exploration.image_url,
      ARRAY_AGG(public.user.username) participants
              FROM exploration 
              FULL JOIN participate on exploration.id = participate.exploration_id
              FULL JOIN public.user on public.user.id = participate.user_id
              WHERE exploration.id IS NOT NULL
              AND exploration.id = $1
              group by (exploration.id);`,

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
        is_published= $7
        WHERE id= $1;`,
      values: [
        id,
        name,
        description,
        geog,
        date,
        max_participants,
        is_published,
      ],
    };
    client.query(updateExploration_query, callback);
  },
};
module.exports = dataExploration;
