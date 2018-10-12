/** URL to git project. */
export const GIT_URL = 'https://github.com/forcedotcom/sfdx-lwc-samples';

/**
 * Gets a URL to the provided file in the git project.
 * @param {String} file the path and filename.
 * @return {String} URL to the file.
 */
export function getGitPath(file) {
    return GIT_URL + '/tree/master/force-app/main/default' + file;
}
