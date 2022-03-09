# Sorry

This directory is a late-game attempt to impose some structure and consistency onto this project.

The codebase was/is a shambles. I won't speculate too much on the origin of the issues, other than to say it clearly included deep misunderstandings of React, HTML, JavaScript, CSS, web browsers, code structure, spelling, user behaviour, and basic logic.

I intend to put sanitised/normalised code for each the site's discrete screens into this folder, instead of variously (and inconsistently) in the `features/` and `pages/` directories, as well as other random places throughout the codebase.

Eventually those directories will be empty, and this directory will be full. Eventually. Probably.

This directory has four children for similar sanitising purposes:
 - `screens/_panels/` for reusable chunks that can be placed within a `screen`
 - `screens/_components/` for reusable chunks that can be placed within a `panel`
 - `screens/_data/` for sensible redux-based data handling
 - `screens/_utilities/` for reusable function code

 Ultimately these child directories can be moved out of the `screens/` directory, but for now keeping the nice code separate is the clearest course of action. (Plus there's an existing `components/` directory that is largely full of shite.)

SUCH FUN.
