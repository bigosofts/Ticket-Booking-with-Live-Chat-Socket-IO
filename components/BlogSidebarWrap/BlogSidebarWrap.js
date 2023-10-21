function BlogSidebarWrap({children}) {
  return (
    <section>
      <div className="full_container">
        <div className="container-travel-page fix port">
          {children}
        </div>
      </div>
    </section>
  );
}

export default BlogSidebarWrap;
