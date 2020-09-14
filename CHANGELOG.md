### Note

Now we are using semantic-release to handle the changelog for this package and their release. You can look at the entire change-log of each release [here](https://github.com/react-native-community/react-native-share/releases).

## 3.0.0-4 (2020-01-16)

##### Build System / Dependencies

- **deps:** bump eslint-utils from 1.4.0 to 1.4.2 ([#580](https://github.com/react-native-community/react-native-share/pull/580)) ([62dd4ab3](https://github.com/react-native-community/react-native-share/commit/62dd4ab3ff0832fe99f37013422d5e4d35357482))
- use react-native-share git master as dependency for RN60 example ([b5eb9d36](https://github.com/react-native-community/react-native-share/commit/b5eb9d365bf23c8e0d8e739957466311caebbdcd))

##### Chores

- **readme:** mocking with Jest example ([#610](https://github.com/react-native-community/react-native-share/pull/610)) ([796ac3a6](https://github.com/react-native-community/react-native-share/commit/796ac3a6e3dd000a3fef36bd8ead4d21483e3289))
- **lint:** fixing lint errors ([4e78f355](https://github.com/react-native-community/react-native-share/commit/4e78f355da44abe84a790d20eddf58629758056e))
- update example to use internal file provider, RN60 autolink works ([aa126048](https://github.com/react-native-community/react-native-share/commit/aa126048206c60291a0e3bb9024542b23abab4af))
- use older flow package, run yarn ([bdee601d](https://github.com/react-native-community/react-native-share/commit/bdee601d3bc3ccbfc513d49f52cb1b2f2456e335))
- fix react version to template versions ([70b0fa38](https://github.com/react-native-community/react-native-share/commit/70b0fa38d88499ae521b390eeef8cccf81ee43e9))
- update gradle wrapper and distribution to 3.5.0/5.6.1-all ([81bf5612](https://github.com/react-native-community/react-native-share/commit/81bf5612298d4ba224705517a37518e5e00575ab))
- update gradle in main project ([5d459e78](https://github.com/react-native-community/react-native-share/commit/5d459e7882ddbd78966f9b0018152ec2a9bbffbc))
- update dependencies and actually port example to RN60 ([2ccc244a](https://github.com/react-native-community/react-native-share/commit/2ccc244ad4a356b0f7296a867d4cebb27d1d869c))
- Adding es6 default export e export with destructing ([018d2a3b](https://github.com/react-native-community/react-native-share/commit/018d2a3b4e3b2e85acbe1aa664b68e4a9312b44b))
- **ShareIntent:** indentation fix ([43fe0b51](https://github.com/react-native-community/react-native-share/commit/43fe0b51eb8697730a864f27eb9bcd4b6df60c90))

##### Continuous Integration

- **fix:** adapt to new workflow ([#626](https://github.com/react-native-community/react-native-share/pull/626)) ([f706e8ca](https://github.com/react-native-community/react-native-share/commit/f706e8cae5b21079c2716998911ad86e0cd1e8ac))

##### Bug Fixes

- removing lint errors ([a977d1f8](https://github.com/react-native-community/react-native-share/commit/a977d1f8bf38c0f9a37571dd2b039ef34b20db6c))
- added missing "v" to `source` field in podspec ([#619](https://github.com/react-native-community/react-native-share/pull/619)) ([d88e542d](https://github.com/react-native-community/react-native-share/commit/d88e542ddd0983d09a4aa1a82737bb05b5731801))
- remove uncessary tools replace on build gradle ([9ad34367](https://github.com/react-native-community/react-native-share/commit/9ad3436701f7799c47f1d861ed78cb604066fbb9))
- instagram-stories build failure ([56f50cc9](https://github.com/react-native-community/react-native-share/commit/56f50cc9eb2ed0ccb0dfa8957cee478e47d76f74))
- update jest to fix known security vulnerabilities ([#577](https://github.com/react-native-community/react-native-share/pull/577)) ([f6c6105b](https://github.com/react-native-community/react-native-share/commit/f6c6105b38e33de9f9af8be9c9cfc604b8eb8959))
- remove redundant dependency ([48492907](https://github.com/react-native-community/react-native-share/commit/48492907e08764dc686877e036f0b9fb9ce6b463))
- use the template support version ([1d7bf06d](https://github.com/react-native-community/react-native-share/commit/1d7bf06dc9618fdeec8fd17dd655f4ff1e0b3b91))
- remove non-template gradle properties caching/parallel ([85426520](https://github.com/react-native-community/react-native-share/commit/854265201b04883042b230037b36b897494b3835))
- .iml files are in .gitignore and should not be committed ([d7b60a50](https://github.com/react-native-community/react-native-share/commit/d7b60a50ca510b3a1d342690ca64ced720b39c84))
- remove version from flowconfig ([5c8b2e37](https://github.com/react-native-community/react-native-share/commit/5c8b2e37a50a5b6ca5cd98bf4e8a9a8cc6edb14b))
- social should be optional in android ([abad39db](https://github.com/react-native-community/react-native-share/commit/abad39dbbade5ca42e0f940bf3a901efdf7be771))

##### Other Changes

- Resolve promise if ShareSheet is manually dismissed ([#607](https://github.com/react-native-community/react-native-share/pull/607)) ([736a8ace](https://github.com/react-native-community/react-native-share/commit/736a8ace926f0eade649c9ae516ace06c4675e22))

#### 1.2.1-5 (2019-05-29)

##### Chores

- **codeowners:** add CODEOWNERS file ([ac67e5cd](https://github.com/react-native-community/react-native-share/commit/ac67e5cd9531e5d554b7b9ac0217c777e4d8f9c4))

### 1.2.0-4 (2019-05-26)

##### Build System / Dependencies

- fix all deprecation and lint in ShareFile(s) ([#374](https://github.com/react-native-community/react-native-share/pull/374)) ([67fb59e9](https://github.com/react-native-community/react-native-share/commit/67fb59e9dc7ec9f98ad76f6809dbc98d240c451e))

##### Chores

- **npmignore:**
  - add .github folder to npmignore ([fc219481](https://github.com/react-native-community/react-native-share/commit/fc2194818c7dba4dd913dd5c65564113ef575a6a))
  - add changelog.js ([8256431b](https://github.com/react-native-community/react-native-share/commit/8256431be2526a55b625b72f4727d8dd8af20aee))
- **changelog:** update changelog.js ([85a91b05](https://github.com/react-native-community/react-native-share/commit/85a91b05993eaaf5e897815029bf58d0944ed3cb))
- Adding instructions about how use the master branch ([c1c58b87](https://github.com/react-native-community/react-native-share/commit/c1c58b876b718bce033593ad52e7fc62fdb32065))
- update iOS target to 9.0 to match react-native min version ([f72dbe1a](https://github.com/react-native-community/react-native-share/commit/f72dbe1a44105a0d04f3af03a7556ea123024493))

##### New Features

- **deps:** update deps and prepare for release ([#501](https://github.com/react-native-community/react-native-share/pull/501)) ([05c2b6a1](https://github.com/react-native-community/react-native-share/commit/05c2b6a1aeb74853ef16265f690b3ba48cd0198f))

#### 1.1.3-3 (2018-10-23)

##### Build System / Dependencies

- reverse dep order, google then jcenter ([#387](https://github.com/react-native-community/react-native-share/pull/387)) ([2c91ecce](https://github.com/react-native-community/react-native-share/commit/2c91ecceda3abe182fa500a6bcd2b09e0b5fd4e5))
- upgrade android dependencies, example depend on upstream ([#373](https://github.com/react-native-community/react-native-share/pull/373)) ([28e62b15](https://github.com/react-native-community/react-native-share/commit/28e62b1526b2242a474b9b7f3a4dd213d2ec3554))

##### Bug Fixes

- **classes-not-exported:** fix classes not exported warning ([540aa8fe](https://github.com/react-native-community/react-native-share/commit/540aa8fe68ede1ac4bfa79698dabe78448b59cc3))

#### 1.1.2-2 (2018-09-12)

#### 1.1.1-1 (2018-08-07)

##### New Features

- **issue-template:** add issue template ([fde759f8](https://github.com/react-native-community/react-native-share/commit/fde759f8412687d7a70a1fca1a848839fb57df51))

#### 1.1.0 (2018-07-25)

##### Build System / Dependencies

- **idx:** add idx as dev dep and improve flow ([eba00817](https://github.com/react-native-community/react-native-share/commit/eba008177c0157f606c14fb13305039dc3058576))

##### Chores

- **readme:** update readme with circle ci status badge ([1a789ffe](https://github.com/react-native-community/react-native-share/commit/1a789ffe51f73a50775d49da1687dbe677faae18))

##### New Features

- **README:** add pagesmanager only android ([cb206d64](https://github.com/react-native-community/react-native-share/commit/cb206d643913c292b668a8b651580c83a77ccfd7))
- **gradle-3:**
  - fix circle script ([5c20929d](https://github.com/react-native-community/react-native-share/commit/5c20929d8fb51fbe08a2bef7d39fd5cb985f39aa))
  - rollback compile and add gradlew clean to circle ([c4bece4f](https://github.com/react-native-community/react-native-share/commit/c4bece4f9a16624a9ef357a5aa7162563ae684ac))
  - rollback to compile ([32217f7f](https://github.com/react-native-community/react-native-share/commit/32217f7f60d9fc8dd07b924b928f8070f30f6b68))
  - fix build.gradle ([6544b5b5](https://github.com/react-native-community/react-native-share/commit/6544b5b5263a337a5c64df3cedd73bf98ae6d6c1))
  - add gradle ([73ed033d](https://github.com/react-native-community/react-native-share/commit/73ed033debdd7f76e53e87866512e57a60dd2fc3))
- **circl-flow-eslint:**
  - fix circle ci yml file name ([2983b13a](https://github.com/react-native-community/react-native-share/commit/2983b13abf61ad3baf9bf7e98074cc4890ea1d87))
  - fix circle ci yml file name ([7d78542d](https://github.com/react-native-community/react-native-share/commit/7d78542d2f563e068cba7f515fa6eed2d56a6406))
- **circle-flow-eslint:** first atempt add circle, add flow, eslint and prettier ([44ac820e](https://github.com/react-native-community/react-native-share/commit/44ac820e77bc90f331490320a509a52d630272b2))
- **social:** add social facebook pages manager ([2537d3fe](https://github.com/react-native-community/react-native-share/commit/2537d3fe8104972014716535ffcdbc3157cb56c0))
- update format ([a32ed6cd](https://github.com/react-native-community/react-native-share/commit/a32ed6cd5a13b90293c6e79c239b16085be52104))
- update readme for url format ([dda13853](https://github.com/react-native-community/react-native-share/commit/dda138536f5d7f27236e95274698cb2766fbfdfe))

##### Bug Fixes

- **changelog:** fallback changelog script ([b635de04](https://github.com/react-native-community/react-native-share/commit/b635de044ce3931a85156fe3c5a23b67c98f0317))
- **flow:** use Node and add CHANGELOG.md ([ed6fcd32](https://github.com/react-native-community/react-native-share/commit/ed6fcd32d398968de7b07dafb6d736ade10525d7))
- **social:** rename file FacebookPagesManager to FacebookPagesManagerShare ([ac25bcad](https://github.com/react-native-community/react-native-share/commit/ac25bcad51a2ae9e0b1b2658de66d1cc06ab83f6))

##### Other Changes

- version ([3f01bb15](https://github.com/react-native-community/react-native-share/commit/3f01bb15f45f684ece157cb00b5c1c10383975ba))
- version ([a708692c](https://github.com/react-native-community/react-native-share/commit/a708692ca18102f84c7012edc4c7460a131cef92))
- version ([77f4d80a](https://github.com/react-native-community/react-native-share/commit/77f4d80acc750a0edd179e85c3e4e9847c42dca6))
- google plus sharing android ([7c6a65f7](https://github.com/react-native-community/react-native-share/commit/7c6a65f76819020d55ca6d95320b0cb1d0060849))
- version 1.0.23 ([9a9f94dd](https://github.com/react-native-community/react-native-share/commit/9a9f94ddbf5a33c9d7afba669dfae73773fe86b2))
- version ([672d6962](https://github.com/react-native-community/react-native-share/commit/672d6962c006e9b52a0a889ce9ff958734f84070))
- email share ([1faeac79](https://github.com/react-native-community/react-native-share/commit/1faeac7914bf1437a7c289bd3922de4fd5e35db4))
- local files shared in android ([797dc89c](https://github.com/react-native-community/react-native-share/commit/797dc89cb7368011ccda74c4b7ff585186e9304a))
