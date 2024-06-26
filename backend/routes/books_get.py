from flask import jsonify, request
from app import app, books_collection 
from datetime import datetime

# Regex Module
import re

def paginate(query, page, limit, sort_field=None, sort_order=1):
    total_queryBooks = books_collection.count_documents(query) 
    total_pages = (total_queryBooks + limit - 1) // limit  
    
    results = books_collection.find(query).skip((page - 1) * limit).limit(limit)

    if sort_field:
        results = results.sort(sort_field, sort_order)

    books = list(results)
    
    pagination_info = {
        "pageCurrent": page,
        "pagePrevious": page - 1 if page > 1 else None,
        "pageNext": page + 1 if page * limit < total_queryBooks else None,
        "pageLast": total_pages,
        "items": total_queryBooks
    }
    
    return books, pagination_info

@app.route("/api/v1/books/allbooks", methods=["GET"])
def get_books():
    # Todos os livros da coleção
    books = list(books_collection.find({}))

    # Converter os objetos BSON para JSON
    for book in books:
        book["_id"] = str(book["_id"])  # Converter o ObjectId para uma string para JSON

    # Formato JSON
    return jsonify(books), 200  # Lista de livros como resposta JSON

# Definição da rota para procurar os livros pelo ID (inteiro)
@app.route("/api/v1/books/<int:id>", methods=["GET"])
def get_book_by_id(id):
    # Procurar o livro pelo campo 'id'
    book = books_collection.find_one({"id": id})

    if book:

        book["_id"] = str(book["_id"])
        return jsonify(book), 200

    else:
        return jsonify({"message": "Error", "status": "Book not found"}), 404


@app.route("/api/v1/books/featured", methods=["GET"])
def get_featured_books():
    # 5 livros com o maior score (decrescente, por isso -1), ordenados por preço (crescente, por isso 1)
    # Garantir que o preço mínimo é maior ou igual a 0 para apenas mostrar livros com preço/disponíveis
    featured_books = list(books_collection.find({"price": {"$gte": 0}}).sort([("score", -1), ("price", 1)]).limit(5))

    for book in featured_books:
        book["_id"] = str(book["_id"])

    return jsonify(featured_books), 200

@app.route("/api/v1/books/bestsellers", methods=["GET"])
def get_bestseller_books():
    # 5 livros com mais vendas (decrescente, por isso -1), ordenados por preço (crescente, por isso 1)
    # Garantir que o preço mínimo é maior ou igual a 0 para apenas mostrar livros com preço/disponíveis
    featured_books = list(books_collection.find({"price": {"$gte": 0}}).sort([("amount_sold", -1), ("price", 1)]).limit(5))

    for book in featured_books:
        book["_id"] = str(book["_id"])

    return jsonify(featured_books), 200


@app.route("/api/v1/books/total", methods=["GET"])
def get_total_books():
    # Número total de livros na coleção
    total_books = books_collection.count_documents({})

    return jsonify({"total_books": total_books}), 200


# Definição da rota para listar os livros com paginação
@app.route("/api/v1/books", methods=["GET"])
def list_books():
    # Obter parâmetros de consulta para paginação
    # Default page = 1 e limit = 10 (pesquisa sem parâmetros de consulta)
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))

    sort_order = int(request.args.get("sort_order", 1))
    sort_field = str(request.args.get("sort_field", "id"))

    query = {}

    books, pagination_info = paginate(query, page, limit, sort_field, sort_order)

    for book in books:
        book["_id"] = str(book["_id"])

    response = {
        "books": books,
        **pagination_info
    }

    return jsonify(response), 200

@app.route("/api/v1/books/author/<author>", methods=["GET"])
def get_books_by_author(author):
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))

    sort_order = int(request.args.get("sort_order", 1))
    sort_field = str(request.args.get("sort_field", "id"))

    query = {"authors": {"$regex": re.compile(author, re.IGNORECASE)}}
    
    books, pagination_info = paginate(query, page, limit, sort_field, sort_order)
    
    for book in books:
        book["_id"] = str(book["_id"])
    
    response = {
        "books": books,
        **pagination_info
    }

    return jsonify(response), 200

@app.route("/api/v1/books/title/<title>", methods=["GET"])
def get_books_by_title(title):
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))

    sort_order = int(request.args.get("sort_order", 1))
    sort_field = str(request.args.get("sort_field", "id"))

    # Consulta regex do MongoDB para corresponder a títulos de livros que contenham a substring fornecida
    # https://pt.stackoverflow.com/questions/486258/por-que-utilizar-uma-expressão-regular-compilada-re-compile-em-python
    query = {"title": {"$regex": re.compile(title, re.IGNORECASE)}}
    
    books, pagination_info = paginate(query, page, limit, sort_field, sort_order)
    
    for book in books:
        book["_id"] = str(book["_id"])
    
    response = {
        "books": books,
        **pagination_info
    }

    return jsonify(response), 200

@app.route("/api/v1/books/year/<int:year>", methods=["GET"])
def get_books_by_year(year):
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))

    sort_order = int(request.args.get("sort_order", 1))
    sort_field = str(request.args.get("sort_field", "id"))

    start_date = datetime(year, 1, 1)
    end_date = datetime(year + 1, 1, 1)

    query = {
        "publishedDate": {
            "$gte": start_date,
            "$lt": end_date
        }
    }
    
    books, pagination_info = paginate(query, page, limit, sort_field, sort_order)
    
    for book in books:
        book["_id"] = str(book["_id"])
    
    response = {
        "books": books,
        **pagination_info
    }

    return jsonify(response), 200

@app.route("/api/v1/books/categories/<categories>", methods=["GET"])
def get_books_by_category(categories):

    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))

    sort_order = int(request.args.get("sort_order", 1))
    sort_field = str(request.args.get("sort_field", "id"))

    query = {"categories": {"$regex": re.compile(categories, re.IGNORECASE)}}
    
    books, pagination_info = paginate(query, page, limit, sort_field, sort_order)
    
    for book in books:
        book["_id"] = str(book["_id"])
    
    response = {
        "books": books,
        **pagination_info
    }

    return jsonify(response), 200

@app.route("/api/v1/books/price", methods=["GET"])
def get_books_by_price():

    min_price = float(request.args.get("min_price", 0))

    # Float inf para o caso de não ser passado um valor máximo
    # Significa o infinito positivo em float (sem limite superior)
    max_price = float(request.args.get("max_price", float("inf")))

    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))

    sort_field = str(request.args.get("sort_field", "price"))
    
    sort_order = int(request.args.get("sort_order", 1))

    query = {
    "price": {
        # "$gte" significa "maior ou igual a" min_price.
        "$gte": min_price,
        
        # "$lte" significa "menor ou igual a" max_price.
        "$lte": max_price}
    }
    
    books, pagination_info = paginate(query, page, limit, sort_field, sort_order)
    
    for book in books:
        book["_id"] = str(book["_id"])
    
    response = {
        "books": books,
        **pagination_info
    }

    return jsonify(response), 200