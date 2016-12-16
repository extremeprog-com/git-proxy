# Git Proxy
Proxy container for working git private repos.

## Problem
Sometimes some of your services needs to have an access to a private repo. For example - some automation services like Rancher, Jenkins, etc. The goal is to make the most secure and convenient way to do that.

## Solution
We propose to use git proxy service that can be a point for all requests from your services to private repos.

## Installation
You can install git proxy using Docker container `extremeprog/git-proxy`. When running container specify your private key. 
We recommend to create additional pair for these purposes.

```bash
$ docker run -d -it --restart=always --name=git-proxy \ 
-e PRIVATE_KEY="..." extremeprog/git-proxy 
```

### Rancher
If you use Rancher you can install Git Proxy service over our extremeprog custom cattle (until it is not added to the main Rancher cattle). Refer to this link https://github.com/extremeprog-com/rancher-catalog.
In Rancher you can use it for connecting private cattles and installing services from your private repos.
