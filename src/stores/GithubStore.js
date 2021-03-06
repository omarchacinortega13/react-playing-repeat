import {observable, action} from 'mobx';
import GithubModel from '../models/githubModel';
import _ from 'lodash';

console.log('_ ', _);


var PROFILES = [
  {
    login: "omar",
    name: "Omar Khudeira",
    avatar_url: "https://avatars.githubusercontent.com/u/196368?v=3"
  },
  {
    login: "omar",
    name: "Omar Khudeira",
    avatar_url: "https://avatars.githubusercontent.com/u/196368?v=3"
  },
  {
    login: "omar",
    name: "Omar Khudeira",
    avatar_url: "https://avatars.githubusercontent.com/u/196368?v=3"
  }
];

class GithubStore {
  @observable profiles = [];

  constructor() {
    PROFILES.map((profile => this.profiles.push(new GithubModel(profile))))
  }

  @action
  async addAccount(name) {
    console.log('name ', name);
    let response = await fetch(`https://api.github.com/users/${name}`);
    console.log('response ', response);
    let profile = await response.json();
    console.log('profile ', profile);
    if (profile.message) {
      //error
      throw Error(profile.message)
    }
    this.profiles.push(new GithubModel(profile))
  }

  @action
  deleteAccount(username) {
    console.log('profile ', username);
    console.log('profiles ', this.profiles);
    _.remove(this.profiles, profile => profile.login == username)
  }

}

const githubStore = new GithubStore();

export default githubStore;