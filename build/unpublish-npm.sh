#!/bin/bash

REGISTRY="https://npmjs-registry.ivyteam.ch/"

npm unpublish "@axonivy/ui-icons@${1}" --registry $REGISTRY
npm unpublish "@axonivy/ui-components@${1}" --registry $REGISTRY
