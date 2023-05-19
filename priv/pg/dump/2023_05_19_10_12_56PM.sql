--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Debian 15.3-1.pgdg110+1)
-- Dumped by pg_dump version 15.3 (Debian 15.3-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account_boards; Type: TABLE; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

CREATE TABLE public.account_boards (
    id bigint NOT NULL,
    account_subject character varying(255) NOT NULL,
    board_id bigint NOT NULL
);


ALTER TABLE public.account_boards OWNER TO "rotiuskyi.dev@gmail.com";

--
-- Name: account_boards_id_seq; Type: SEQUENCE; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

CREATE SEQUENCE public.account_boards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_boards_id_seq OWNER TO "rotiuskyi.dev@gmail.com";

--
-- Name: account_boards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

ALTER SEQUENCE public.account_boards_id_seq OWNED BY public.account_boards.id;


--
-- Name: accounts; Type: TABLE; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

CREATE TABLE public.accounts (
    subject character varying(255) NOT NULL,
    issuer character varying(255) NOT NULL,
    user_name character varying(255),
    user_email character varying(255) NOT NULL,
    picture character varying(255)
);


ALTER TABLE public.accounts OWNER TO "rotiuskyi.dev@gmail.com";

--
-- Name: boards; Type: TABLE; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

CREATE TABLE public.boards (
    id bigint NOT NULL,
    title character varying(255) NOT NULL
);


ALTER TABLE public.boards OWNER TO "rotiuskyi.dev@gmail.com";

--
-- Name: boards_id_seq; Type: SEQUENCE; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

CREATE SEQUENCE public.boards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.boards_id_seq OWNER TO "rotiuskyi.dev@gmail.com";

--
-- Name: boards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

ALTER SEQUENCE public.boards_id_seq OWNED BY public.boards.id;


--
-- Name: devices; Type: TABLE; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

CREATE TABLE public.devices (
    id bigint NOT NULL,
    title character varying(255) NOT NULL,
    board_id bigint NOT NULL
);


ALTER TABLE public.devices OWNER TO "rotiuskyi.dev@gmail.com";

--
-- Name: devices_id_seq; Type: SEQUENCE; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

CREATE SEQUENCE public.devices_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.devices_id_seq OWNER TO "rotiuskyi.dev@gmail.com";

--
-- Name: devices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

ALTER SEQUENCE public.devices_id_seq OWNED BY public.devices.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

CREATE TABLE public.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE public.schema_migrations OWNER TO "rotiuskyi.dev@gmail.com";

--
-- Name: account_boards id; Type: DEFAULT; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

ALTER TABLE ONLY public.account_boards ALTER COLUMN id SET DEFAULT nextval('public.account_boards_id_seq'::regclass);


--
-- Name: boards id; Type: DEFAULT; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

ALTER TABLE ONLY public.boards ALTER COLUMN id SET DEFAULT nextval('public.boards_id_seq'::regclass);


--
-- Name: devices id; Type: DEFAULT; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

ALTER TABLE ONLY public.devices ALTER COLUMN id SET DEFAULT nextval('public.devices_id_seq'::regclass);


--
-- Data for Name: account_boards; Type: TABLE DATA; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

COPY public.account_boards (id, account_subject, board_id) FROM stdin;
4	116084374688887695739	4
5	116084374688887695739	5
6	116084374688887695739	6
7	116084374688887695739	7
8	116084374688887695739	8
\.


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

COPY public.accounts (subject, issuer, user_name, user_email, picture) FROM stdin;
116084374688887695739	https://accounts.google.com	Roman Otiuskyi	rotiuskyi.dev@gmail.com	https://lh3.googleusercontent.com/a/AGNmyxYk6n3T-JbbhTuqP_9VurL2i3HBzzuOXDY7tWOx=s96-c
\.


--
-- Data for Name: boards; Type: TABLE DATA; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

COPY public.boards (id, title) FROM stdin;
4	Test Board 1
5	Test Board 2
6	Test Board 3
7	Test Board 4
8	Test Board 5
\.


--
-- Data for Name: devices; Type: TABLE DATA; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

COPY public.devices (id, title, board_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

COPY public.schema_migrations (version, inserted_at) FROM stdin;
20230502124053	2023-05-15 15:07:20
20230502202825	2023-05-15 15:07:20
20230502203547	2023-05-15 15:07:20
20230506180320	2023-05-15 15:07:20
\.


--
-- Name: account_boards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

SELECT pg_catalog.setval('public.account_boards_id_seq', 9, true);


--
-- Name: boards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

SELECT pg_catalog.setval('public.boards_id_seq', 9, true);


--
-- Name: devices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

SELECT pg_catalog.setval('public.devices_id_seq', 1, false);


--
-- Name: account_boards account_boards_pkey; Type: CONSTRAINT; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

ALTER TABLE ONLY public.account_boards
    ADD CONSTRAINT account_boards_pkey PRIMARY KEY (id);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (subject);


--
-- Name: boards boards_pkey; Type: CONSTRAINT; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_pkey PRIMARY KEY (id);


--
-- Name: devices devices_pkey; Type: CONSTRAINT; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT devices_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: account_boards account_boards_account_subject_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

ALTER TABLE ONLY public.account_boards
    ADD CONSTRAINT account_boards_account_subject_fkey FOREIGN KEY (account_subject) REFERENCES public.accounts(subject);


--
-- Name: account_boards account_boards_board_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

ALTER TABLE ONLY public.account_boards
    ADD CONSTRAINT account_boards_board_id_fkey FOREIGN KEY (board_id) REFERENCES public.boards(id);


--
-- Name: devices devices_board_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rotiuskyi.dev@gmail.com
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT devices_board_id_fkey FOREIGN KEY (board_id) REFERENCES public.boards(id);


--
-- PostgreSQL database dump complete
--

