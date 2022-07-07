const { execSync } = require("child_process");
const SemVer = require("semver/classes/semver");
const { stableBranchName, GhApi } = require("./utils.js");
const pkg = require("../../package.json");

const semVer = new SemVer(pkg.version);
const gh = new GhApi();

const full_repository = process.env.GITHUB_REPOSITORY.split("/");

const owner = full_repository[0];
const repo = full_repository[1];
const pullNumber = process.env.GITHUB_PULL_NUMBER;

const patchCommits = gh.listCommitsOnPullRequest(owner, repo, pullNumber);

const stableBranchRef = stableBranchName(semVer);
const patchRefs = patchCommits.map((commit) => commit.sha).join(" ");

execSync(`git fetch origin ${stableBranchRef} ${patchRefs}`);
execSync(`git checkout ${stableBranchRef}`);
execSync(`git cherry-pick ${patchRefs}`);
execSync(`git push origin ${stableBranchRef}`);