CREATE OR REPLACE FUNCTION public.get_leaderboard_v0()
RETURNS TABLE("user" uuid, displayname text, "xUsername" text, wpm smallint, accuracy smallint) AS $$
BEGIN
    RETURN QUERY
    WITH RankedWPM AS (
        SELECT 
            results."user" AS user_id,  -- Specify the table name and alias it
            users.displayname AS user_displayname,  -- Alias the column to avoid ambiguity
            users."xUsername" AS user_xUsername,  -- Alias the column to avoid ambiguity
            results.wpm AS user_wpm,  -- Alias the column to avoid ambiguity
            results.accuracy AS user_accuracy,  -- Alias the column to avoid ambiguity
            ROW_NUMBER() OVER (PARTITION BY results."user" ORDER BY results.wpm DESC) AS rank
        FROM 
            results
        JOIN 
            users ON results."user" = users.id
    )
    SELECT 
        user_id AS "user",  -- Use the alias here
        user_displayname AS displayname,  -- Use the aliased column name
        user_xUsername AS "xUsername",  -- Use the aliased column name
        user_wpm AS wpm,  -- Use the aliased column name
        user_accuracy AS accuracy  -- Use the aliased column name
    FROM 
        RankedWPM
    WHERE 
        rank = 1  -- Only take the highest WPM for each user
    ORDER BY 
        user_wpm DESC  -- Sort by WPM in descending order
    LIMIT 10;  -- Limit to the top 10 users
END;
$$ LANGUAGE plpgsql;
