# sync-dir-structures

Takes a source directory and a directory containing files and generates a series of `mkdir` and `cp` commands that will copy files from the files directory into a third directory which matches the structure of the source directory.

## Why?

Because I uploaded a bunch of files to Google Drive, organized them, and wanted to download the organized folder back to my computer.  But then I realized that Google Drive did not preserve the timestamps of the original files, which I didn't like.  So I wanted to figure out a way to sort my orginal files directory into the same structure as the one I downloaded from Google Drive.  Since I didn't change any file names, I was able to create this program to examine the Google Drive folder and search for a file with a matching name in the files directory and generate a `cp` command.

## Caveats

There is no guarantee that the end result will match the source folder 100%.  This program uses a very simple algorithm and will not work well if many files have the same name.  But it should get you most of the way there, and you can run the `main-verify.ts` to verify the source and destination directories match (or use an rsync command like `rsync -rnc <source> <dest>`).

