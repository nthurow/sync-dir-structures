# sync-dir-structures

Run rsync command to verify results:

```bash
$ rsync -rvnci /src/dir /dest/dir
```

TODO:
 - If file exists in source but not in dest, copy it
 - Update timestamps of all images files to match image metadata
