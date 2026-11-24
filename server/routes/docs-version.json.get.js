// Which technical-docs commit the live site was built from. The deploy
// workflow compares this with technical-docs to decide whether to rebuild.
import { useDocs } from "../utils/docs.js";

export default defineEventHandler(() => ({ commit: useDocs().version }));
