'use client'

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from 'use-debounce';
import { fetchNotes, FetchNotesResponse } from "@/lib/api/clientApi";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./Notes.client.module.css";
import Link from "next/link";

interface NotesClientProps {
    initialData: FetchNotesResponse;
    initialSearch: string;
    initialPage: number;
    tag: string
}
  
export default function NotesClient({initialData, initialSearch, initialPage, tag}: NotesClientProps) {  
    const [inputValue, setInputValue] = useState(initialSearch);
    const [page, setPage] = useState<number>(initialPage);
    const [debouncedValue] = useDebounce(inputValue, 300)

    const { data, isSuccess } = useQuery({
        queryKey: ["notes", debouncedValue, page, tag],
        queryFn: () => fetchNotes(debouncedValue, page, tag),
        placeholderData: keepPreviousData,
        refetchOnMount: true,
        initialData,
    })

    const onSearch = (value: string) => {
        setInputValue(value);
        setPage(1);
    };
    
return <>
    <div className={css.app}>
        <div className={css.toolbar}>
            <SearchBox value={inputValue} onSearch={onSearch}/>
            
            {isSuccess && data.totalPages > 1 && <Pagination totalPages={data.totalPages} currentPage={page} onPageChange={setPage} />}
                
            <Link className={css.button} href={"/notes/action/create"}>Create note +</Link>
        </div>
    </div>
        
    {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
</>
}
